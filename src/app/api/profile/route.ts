import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/sb/server";
import { getProfileById } from "@/lib/queries";
import { updateProfile } from "@/lib/actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const data = await getProfileById(user.id);

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
    const body = await request.json().catch(() => ({}));
    const data = await updateProfile(body);

    return NextResponse.json(
      { profile: data },
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
