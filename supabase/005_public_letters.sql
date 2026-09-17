-- =====================================================
-- PostLeaf
-- Migration: 005_public_letters.sql
-- Purpose: Public snapshots of letters for Discover.
-- =====================================================

-- =====================================================
-- Public Letters
-- =====================================================

CREATE TABLE public.public_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Internal references
    original_letter_id UUID NOT NULL
        REFERENCES public.letters(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    -- Snapshot
    version INTEGER NOT NULL DEFAULT 1,

    title TEXT,

    content TEXT NOT NULL,

    excerpt TEXT NOT NULL,

    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),

    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.public_letters IS
'Immutable public snapshots of letters displayed in Discover.';

COMMENT ON COLUMN public.public_letters.original_letter_id IS
'Original private letter from which this snapshot was created.';

COMMENT ON COLUMN public.public_letters.user_id IS
'Internal ownership reference. Never exposed to clients.';

COMMENT ON COLUMN public.public_letters.version IS
'Snapshot version. Reserved for future republication support.';
