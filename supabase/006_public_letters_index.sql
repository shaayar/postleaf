-- =====================================================
-- PostLeaf
-- Migration: 006_public_letters_index.sql
-- Purpose: Indexes for public_letters
-- =====================================================

CREATE INDEX idx_public_letters_published_at_desc
    ON public.public_letters(published_at DESC);

CREATE INDEX idx_public_letters_original_letter_id
    ON public.public_letters(original_letter_id);

CREATE INDEX idx_public_letters_user_id
    ON public.public_letters(user_id);