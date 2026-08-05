import "server-only";

import type {
  Letter,
  LetterDetail,
  LetterListItem,
  LetterStatus,
  LetterStats,
  LetterSummary,
} from "@/types";
import { buildExcerpt } from "@/lib/utils/letters";
import { formatRelativeDate } from "@/lib/utils/dates";
import { createClient } from "@/lib/sb/server";

const LETTER_COLUMNS =
  "id, user_id, title, content, recipient_label, collection, status, visibility, word_count, character_count, created_at, updated_at";

function toSummary(letter: Letter): LetterSummary {
  return {
    id: letter.id,
    title: letter.title,
    excerpt: buildExcerpt(letter.content),
    recipient_label: letter.recipient_label,
    collection: letter.collection,
    status: letter.status,
    visibility: letter.visibility,
    updated_at: letter.updated_at,
  };
}

function toListItem(letter: Letter, now = new Date()): LetterListItem {
  const summary = toSummary(letter);

  return {
    ...summary,
    updated_at_label: formatRelativeDate(new Date(letter.updated_at), now),
  };
}

function toDetail(letter: Letter, now = new Date()): LetterDetail {
  return {
    ...letter,
    excerpt: buildExcerpt(letter.content),
    updated_at_label: formatRelativeDate(new Date(letter.updated_at), now),
  };
}

async function getAuthedClient() {
  return createClient();
}

export async function getLetterById(id: string): Promise<LetterDetail | null> {
  const supabase = await getAuthedClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("letters")
    .select(LETTER_COLUMNS)
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? toDetail(data as Letter) : null;
}

export async function listLetters(options: {
  status?: LetterStatus;
  limit?: number;
  offset?: number;
} = {}): Promise<LetterListItem[]> {
  const supabase = await getAuthedClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? null;

  if (!userId) {
    return [];
  }

  const { status, limit = 50, offset = 0 } = options;
  let query = supabase
    .from("letters")
    .select(LETTER_COLUMNS)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const now = new Date();
  return (data ?? []).map((letter) => toListItem(letter as Letter, now));
}

export async function searchLetters(
  query: string,
  options: {
    status?: LetterStatus;
    limit?: number;
  } = {},
): Promise<LetterListItem[]> {
  const supabase = await getAuthedClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? null;

  if (!userId) {
    return [];
  }

  const normalized = query.trim();
  if (!normalized) {
    return listLetters(options);
  }

  const { status, limit = 50 } = options;
  let lettersQuery = supabase
    .from("letters")
    .select(LETTER_COLUMNS)
    .eq("user_id", userId)
    .or(
      [
        `title.ilike.%${normalized}%`,
        `content.ilike.%${normalized}%`,
        `recipient_label.ilike.%${normalized}%`,
        `collection.ilike.%${normalized}%`,
      ].join(","),
    )
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (status) {
    lettersQuery = lettersQuery.eq("status", status);
  }

  const { data, error } = await lettersQuery;

  if (error) {
    throw new Error(error.message);
  }

  const now = new Date();
  return (data ?? []).map((letter) => toListItem(letter as Letter, now));
}

export async function getRecentLetters(
  limit = 5,
): Promise<LetterListItem[]> {
  return listLetters({ limit });
}

export async function getLetterStats(): Promise<LetterStats> {
  const supabase = await getAuthedClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? null;

  if (!userId) {
    return {
      draft_count: 0,
      published_count: 0,
      archived_count: 0,
      total_count: 0,
    };
  }

  async function countLetters(status?: LetterStatus) {
    let query = supabase
      .from("letters")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (status) {
      query = query.eq("status", status);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  const [draftCount, publishedCount, archivedCount, totalCount] =
    await Promise.all([
      countLetters("draft"),
      countLetters("published"),
      countLetters("archived"),
      countLetters(),
    ]);

  return {
    draft_count: draftCount,
    published_count: publishedCount,
    archived_count: archivedCount,
    total_count: totalCount,
  };
}
