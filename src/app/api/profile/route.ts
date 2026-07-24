import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerSupabase } from "@/lib/sb/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createServiceClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: "Failed to resolve current user", details: userError.message },
        { status: 401 },
      );
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const serviceClient = await getServiceClient();
    if (!serviceClient) {
      return NextResponse.json(
        {
          error:
            "Server is missing SUPABASE configuration. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
        },
        { status: 500 },
      );
    }

    const { error: ensureProfileError } = await serviceClient
      .from("profiles")
      .upsert({ id: user.id }, { onConflict: "id" });

    if (ensureProfileError) {
      return NextResponse.json(
        { error: "Failed to prepare profile", details: ensureProfileError.message },
        { status: 500 },
      );
    }

    const { data, error } = await serviceClient
      .from("profiles")
      .select("avatar_url, username, bio")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch profile", details: error.message },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(
      { profile: data, email: user.email ?? null },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected server error", details: message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: "Failed to resolve current user", details: userError.message },
        { status: 401 },
      );
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const updates: Record<string, unknown> = {};
    if (typeof body.username === "string") updates.username = body.username.trim();
    if (typeof body.bio === "string") updates.bio = body.bio.trim();

    const allowedKeys = ["username", "bio"] as const;
    const hasAllowed = Object.keys(updates).some((k) =>
      (allowedKeys as readonly string[]).includes(k),
    );
    if (!hasAllowed) {
      return NextResponse.json(
        { error: "No valid fields provided. Allowed: username, bio" },
        { status: 400 },
      );
    }

    const serviceClient = await getServiceClient();
    if (!serviceClient) {
      return NextResponse.json(
        { error: "Server is missing SUPABASE configuration" },
        { status: 500 },
      );
    }

    const { data, error } = await serviceClient
      .from("profiles")
      .upsert(
        {
          id: user.id,
          ...updates,
        },
        { onConflict: "id" },
      )
      .select("avatar_url, username, bio")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update profile", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { profile: data, email: user.email ?? null },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected server error", details: message },
      { status: 500 },
    );
  }
}
