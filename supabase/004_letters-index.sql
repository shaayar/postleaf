CREATE INDEX idx_letters_user_id
    ON public.letters(user_id);

CREATE INDEX idx_letters_updated_at
    ON public.letters(updated_at DESC);

CREATE INDEX idx_letters_status
    ON public.letters(status);

CREATE INDEX idx_letters_visibility
    ON public.letters(visibility);

CREATE INDEX idx_letters_collection
    ON public.letters(collection);