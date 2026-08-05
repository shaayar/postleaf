-- =====================================================
-- PostLeaf
-- Migration: 003_letters_rls.sql
-- Purpose: Row Level Security policies for letters.
-- =====================================================

-- =====================================================
-- Enable RLS
-- =====================================================

ALTER TABLE public.letters
ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- SELECT
-- Users may only read their own letters.
-- =====================================================

CREATE POLICY "Users can view their own letters"
ON public.letters
FOR SELECT
USING (
    auth.uid() = user_id
);

-- =====================================================
-- INSERT
-- Users may only create letters for themselves.
-- =====================================================

CREATE POLICY "Users can create their own letters"
ON public.letters
FOR INSERT
WITH CHECK (
    auth.uid() = user_id
);

-- =====================================================
-- UPDATE
-- Users may only update their own letters.
-- =====================================================

CREATE POLICY "Users can update their own letters"
ON public.letters
FOR UPDATE
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);

-- =====================================================
-- DELETE
-- Users may only delete their own letters.
-- =====================================================

CREATE POLICY "Users can delete their own letters"
ON public.letters
FOR DELETE
USING (
    auth.uid() = user_id
);