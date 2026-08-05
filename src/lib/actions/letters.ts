import "server-only";

import { revalidatePath } from "next/cache";

import type { Letter, LetterDetail } from "@/types";
import {
  countCharacters,
  countWords,
  buildExcerpt,
} from "@/lib/utils/letters";
import {
  validateLetterCreateInput,
  validateLetterStatusInput,
  validateLetterUpdateInput,
} from "@/resources/validation";
import { createClient } from "@/lib/sb/server";

const LETTER_COLUMNS =
  "id, user_id, title, content, recipient_label, collection, status, visibility, word_count, character_count, created_at, updated_at";

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

  return { supabase, user };
}

function firstError(errors: Record<string, string> | undefined, fallback: string) {
  return (
    Object.values(errors ?? {}).find(
      (message): message is string =>
        typeof message === "string" && message.length > 0,
    ) ?? fallback
  );
}

function toDetail(letter: Letter): LetterDetail {
  return {
    ...letter,
    excerpt: buildExcerpt(letter.content),
    updated_at_label: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(letter.updated_at)),
  };
}

function buildStatusVisibility(
  status: Letter["status"],
  visibility?: Letter["visibility"],
): Letter["visibility"] {
  if (visibility) {
    return visibility;
  }

  if (status === "published") {
    return "public";
  }

  return "private";
}

export async function createLetter(input: unknown): Promise<LetterDetail> {
  const parsed = validateLetterCreateInput(input);
  if (!parsed.ok || !parsed.data) {
    throw new Error(firstError(parsed.errors, "Invalid letter data"));
  }

  const { supabase, user } = await getCurrentUser();
  const payload = parsed.data;
  const status = payload.status ?? "draft";
  const content = payload.content.trim();

  const { data, error } = await supabase
    .from("letters")
    .insert({
      user_id: user.id,
      title: payload.title?.trim() || null,
      content,
      recipient_label: payload.recipient_label?.trim() || null,
      collection: payload.collection?.trim() || null,
      status,
      visibility: buildStatusVisibility(status, payload.visibility),
      word_count: countWords(content),
      character_count: countCharacters(content),
    })
    .select(LETTER_COLUMNS)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create letter");
  }

  revalidatePath("/dashboard");
  revalidatePath("/library");
  revalidatePath("/profile");
  revalidatePath("/write");

  return toDetail(data as Letter);
}

export async function updateLetter(input: unknown): Promise<LetterDetail> {
  const parsed = validateLetterUpdateInput(input);
  if (!parsed.ok || !parsed.data) {
    throw new Error(firstError(parsed.errors, "Invalid letter data"));
  }

  const { supabase, user } = await getCurrentUser();
  const { id, ...payload } = parsed.data;
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (
    payload.title === undefined &&
    payload.content === undefined &&
    payload.recipient_label === undefined &&
    payload.collection === undefined &&
    payload.visibility === undefined
  ) {
    throw new Error("No letter fields were provided");
  }

  if (payload.title !== undefined) updates.title = payload.title?.trim() || null;
  if (payload.content !== undefined) {
    const content = payload.content.trim();
    updates.content = content;
    updates.word_count = countWords(content);
    updates.character_count = countCharacters(content);
  }
  if (payload.recipient_label !== undefined) {
    updates.recipient_label = payload.recipient_label?.trim() || null;
  }
  if (payload.collection !== undefined) {
    updates.collection = payload.collection?.trim() || null;
  }
  if (payload.visibility !== undefined) {
    updates.visibility = payload.visibility;
  }

  const { data, error } = await supabase
    .from("letters")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select(LETTER_COLUMNS)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update letter");
  }

  revalidatePath("/dashboard");
  revalidatePath("/library");
  revalidatePath("/profile");
  revalidatePath("/write");

  return toDetail(data as Letter);
}

export async function updateLetterStatus(input: unknown): Promise<LetterDetail> {
  const parsed = validateLetterStatusInput(input);
  if (!parsed.ok || !parsed.data) {
    throw new Error(firstError(parsed.errors, "Invalid letter status"));
  }

  const { supabase, user } = await getCurrentUser();
  const visibility = buildStatusVisibility(parsed.data.status);

  const { data, error } = await supabase
    .from("letters")
    .update({
      status: parsed.data.status,
      visibility,
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id)
    .eq("user_id", user.id)
    .select(LETTER_COLUMNS)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update letter status");
  }

  revalidatePath("/dashboard");
  revalidatePath("/library");
  revalidatePath("/profile");
  revalidatePath("/write");

  return toDetail(data as Letter);
}

export async function deleteLetter(id: string): Promise<{ id: string }> {
  const { supabase, user } = await getCurrentUser();
  const { error } = await supabase
    .from("letters")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/library");
  revalidatePath("/profile");
  revalidatePath("/write");

  return { id };
}
