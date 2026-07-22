import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { updateSession } from "@/lib/sb/middleware";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),                       // UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
  limiter: Ratelimit.slidingWindow(30, "1 m"),  // 30 req/min per key
});

export async function proxy(request: NextRequest) {
  // Determine a stable per-client key: prefer x-forwarded-for, fall back to request.ip, finally localhost
  const xff = request.headers.get("x-forwarded-for");
  const ip =
    xff?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "127.0.0.1";
  const path = new URL(request.url).pathname;
  const key = `ip:${ip}:${path}`;

  // Rate limit
  const { success, remaining, limit, reset } = await ratelimit.limit(key);

  if (!success) {
    const retry = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return new NextResponse("too many requests", {
      status: 429,
      headers: {
        "retry-after": String(retry),
        "x-ratelimit-limit": String(limit),
        "x-ratelimit-remaining": "0",
      },
    });
  }

  // Continue to your Supabase session refresh
  const res = await updateSession(request);

  // Attach rate-limit headers for observability
  res.headers.set("x-ratelimit-limit", String(limit));
  res.headers.set("x-ratelimit-remaining", String(remaining));

  return res;
}