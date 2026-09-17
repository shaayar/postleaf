export type LetterStatus = "draft" | "published" | "archived";

export type LetterVisibility = "private" | "public" | "unlisted";

export interface Letter {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  recipient_label: string | null;
  collection: string | null;
  status: LetterStatus;
  visibility: LetterVisibility;
  word_count: number;
  character_count: number;
  created_at: string;
  updated_at: string;
}

export interface LetterSummary {
  id: string;
  title: string | null;
  excerpt: string;
  recipient_label: string | null;
  collection: string | null;
  status: LetterStatus;
  visibility: LetterVisibility;
  updated_at: string;
}

export interface LetterListItem extends LetterSummary {
  updated_at_label: string;
}

export interface LetterDetail extends Letter {
  excerpt: string;
  updated_at_label: string;
}

export interface LetterCreateInput {
  title?: string | null;
  content: string;
  recipient_label?: string | null;
  collection?: string | null;
  status?: LetterStatus;
  visibility?: LetterVisibility;
}

export interface LetterUpdateInput {
  id: string;
  title?: string | null;
  content?: string;
  recipient_label?: string | null;
  collection?: string | null;
  visibility?: LetterVisibility;
}

export interface LetterStatusInput {
  id: string;
  status: LetterStatus;
}

export interface LetterStats {
  draft_count: number;
  published_count: number;
  archived_count: number;
  total_count: number;
}

export interface PublicLetter {
  id: string;
  original_letter_id: string;
  user_id: string;
  version: number;
  title: string | null;
  content: string;
  excerpt: string;
  created_at: string;
  published_at: string;
}

export interface PublicLetterListItem {
  id: string;
  title: string | null;
  content: string;
  excerpt: string;
  published_at: string;
}
