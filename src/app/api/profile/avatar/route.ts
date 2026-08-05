import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/sb/server";
import { uploadAvatar } from "@/lib/actions";

export const runtime = "nodejs"; // Required for File handling in the route
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

    const form = await request.formData();
    const file = form.get("file");

    const result = await uploadAvatar(file);

    return NextResponse.json(
      result,
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
