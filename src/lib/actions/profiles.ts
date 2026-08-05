import "server-only";

import { Buffer } from "node:buffer";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import type { Profile } from "@/types";
import {
  normalizeProfileUpdateInput,
  validateAvatarFile,
  validateProfileUpdateInput,
} from "@/resources/validation";
import { createClient } from "@/lib/sb/server";

async function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

async function getUpdatedProfile(userId: string): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, created_at, updated_at")
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to load profile");
  }

  return data as Profile;
}

function firstError(errors: Record<string, string> | undefined, fallback: string) {
  return (
    Object.values(errors ?? {}).find(
      (message): message is string =>
        typeof message === "string" && message.length > 0,
    ) ?? fallback
  );
}

export async function updateProfile(input: unknown): Promise<Profile> {
  const parsed = validateProfileUpdateInput(input);
  if (!parsed.ok || !parsed.data) {
    throw new Error(firstError(parsed.errors, "Invalid profile data"));
  }

  const user = await getCurrentUser();
  const supabase = await createClient();
  const payload = normalizeProfileUpdateInput(parsed.data);
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (payload.username !== undefined) {
    updates.username = payload.username;
  }

  if (payload.bio !== undefined) {
    updates.bio = payload.bio;
  }

  if (Object.keys(updates).length === 1) {
    throw new Error("No profile fields were provided");
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/settings");
  revalidatePath("/dashboard");

  return getUpdatedProfile(user.id);
}

export async function uploadAvatar(fileInput: unknown) {
  const parsed = validateAvatarFile(fileInput);
  if (!parsed.ok || !parsed.data) {
    throw new Error(firstError(parsed.errors, "Invalid avatar file"));
  }

  const user = await getCurrentUser();
  const serviceClient = await getServiceClient();

  if (!serviceClient) {
    throw new Error("Server is missing Supabase service credentials");
  }

  const file = parsed.data;
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const objectPath = `${user.id}/avatar.${fileExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await serviceClient.storage
    .from("profiles")
    .upload(objectPath, buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = serviceClient.storage
    .from("profiles")
    .getPublicUrl(objectPath);

  const avatar_url = publicUrlData.publicUrl;
  const supabase = await createClient();

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/settings");
  revalidatePath("/dashboard");

  return {
    profile: await getUpdatedProfile(user.id),
    avatar_url,
    path: objectPath,
  };
}
