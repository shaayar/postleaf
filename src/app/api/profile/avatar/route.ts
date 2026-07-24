import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerSupabase } from "@/lib/sb/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs"; // Required to safely use the service role key
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

export async function POST(request: Request) {
  try {
    // Identify current user
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

    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid request: expected a file field named 'file'" },
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

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
    const objectPath = `${user.id}/avatar.${fileExt}`;

    // Convert the uploaded File (web) to a Buffer for Node.js runtime compatibility
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to storage bucket 'profiles'
    const { error: uploadError } = await serviceClient.storage
      .from("profiles")
      .upload(objectPath, buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType:
          file.type ||
          (fileExt === "png"
            ? "image/png"
            : fileExt === "jpg" || fileExt === "jpeg"
              ? "image/jpeg"
              : undefined),
      });

    if (uploadError) {
      // Minimal server-side logging to aid debugging in development
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload avatar", details: uploadError.message },
        { status: 500 },
      );
    }

    // If bucket is public, we can compute a public URL. Otherwise, you may want to create signed URLs.
    const { data: publicUrlData } = serviceClient.storage.from("profiles").getPublicUrl(objectPath);
    const avatarUrl = publicUrlData.publicUrl;

    const { error: ensureProfileError } = await serviceClient
      .from("profiles")
      .upsert({ id: user.id, avatar_url: avatarUrl }, { onConflict: "id" });

    if (ensureProfileError) {
      return NextResponse.json(
        { error: "Failed to update profile with avatar", details: ensureProfileError.message },
        { status: 500 },
      );
    }

    const { data: updated, error: updateError } = await serviceClient
      .from("profiles")
      .select("avatar_url, username, bio")
      .eq("id", user.id)
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update profile with avatar", details: updateError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { profile: updated, avatar_url: avatarUrl, path: objectPath },
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
