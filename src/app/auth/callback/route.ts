import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

  const targetPath = type === "recovery" ? "/auth/update-password" : "/profile";
  const targetUrl = new URL(targetPath, requestUrl.origin);

  if (!code) {
    targetUrl.pathname = "/auth";
    targetUrl.searchParams.set("state", "login");
    return NextResponse.redirect(targetUrl);
  }

  const response = NextResponse.redirect(targetUrl);
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    targetUrl.pathname = "/auth";
    targetUrl.searchParams.set("state", "login");
    targetUrl.searchParams.set("error", "auth");
    return NextResponse.redirect(targetUrl);
  }

  return response;
}
