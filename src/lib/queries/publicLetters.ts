import "server-only";

import type { PublicLetterListItem } from "@/types";
import { createClient } from "@/lib/sb/server";

const PUBLIC_LETTER_COLUMNS = "id, title, content, excerpt, published_at";

function toListItem(letter: PublicLetterListItem) {
  return {
    id: letter.id,
    title: letter.title,
    content: letter.content,
    excerpt: letter.excerpt,
    published_at: letter.published_at,
  };
}

export async function listPublicLetters(
  limit = 50,
): Promise<PublicLetterListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("public_letters")
    .select(PUBLIC_LETTER_COLUMNS)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((letter) => toListItem(letter as PublicLetterListItem));
}
