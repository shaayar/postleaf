-- =====================================================
-- PostLeaf
-- Migration: 007_public_letters_rls.sql
-- Purpose: Row Level Security for public_letters
-- =====================================================

ALTER TABLE public.public_letters ENABLE ROW LEVEL SECURITY;

-- SELECT: anyone can read
CREATE POLICY "Public can read public letters"
ON public.public_letters
FOR SELECT
USING (true);

-- INSERT: authenticated users can insert only their own snapshot
CREATE POLICY "Authenticated users can insert their own public letters"
ON public.public_letters
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- DELETE: only owner can delete their public letters
CREATE POLICY "Owner can delete their public letters"
ON public.public_letters
FOR DELETE
USING (auth.uid() = user_id);
