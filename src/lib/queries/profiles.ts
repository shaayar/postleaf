import "server-only";

import type { Profile } from "@/types";
import { createClient } from "@/lib/sb/server";

async function getAuthedClient() {
  return createClient();
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await getAuthedClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return getProfileById(user.id);
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const supabase = await getAuthedClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile | null;
}

export async function getProfileByUsername(
  username: string,
): Promise<Profile | null> {
  const supabase = await getAuthedClient();
  const normalized = username.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, created_at, updated_at")
    .eq("username", normalized)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile | null;
}
