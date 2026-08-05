-- =====================================================
-- PostLeaf
-- Migration: 002_letters.sql
-- Purpose: Introduce the core Letter domain model.
-- =====================================================

-- =====================================================
-- Enums
-- =====================================================

CREATE TYPE letter_status AS ENUM (
    'draft',
    'published',
    'archived'
);

CREATE TYPE letter_visibility AS ENUM (
    'private',
    'public',
    'unlisted'
);

-- =====================================================
-- Letters
-- =====================================================

CREATE TABLE public.letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    title TEXT,

    content TEXT NOT NULL DEFAULT '',

    recipient_label TEXT,

    collection TEXT,

    status letter_status NOT NULL DEFAULT 'draft',

    visibility letter_visibility NOT NULL DEFAULT 'private',

    word_count INTEGER NOT NULL DEFAULT 0,

    character_count INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- =====================================================
-- Comments
-- =====================================================

COMMENT ON TABLE public.letters IS
'Primary writing entity for PostLeaf. Every letter belongs to a single user.';

COMMENT ON COLUMN public.letters.title IS
'Optional title. If NULL, the UI derives a display title from the opening line or shows "Untitled Letter".';

COMMENT ON COLUMN public.letters.content IS
'Full markdown/plain-text content of the letter.';

COMMENT ON COLUMN public.letters.recipient_label IS
'Optional free-form recipient label such as "Mom" or "Future Me".';

COMMENT ON COLUMN public.letters.collection IS
'Simple user-defined collection name. This remains text until collections become a first-class feature.';

COMMENT ON COLUMN public.letters.word_count IS
'Cached word count maintained by the application for faster reads.';

COMMENT ON COLUMN public.letters.character_count IS
'Cached character count maintained by the application.';