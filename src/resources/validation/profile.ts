import type { ProfileUpdateInput } from "@/types";

export const profileValidation = {
  username: {
    min_length: 3,
    max_length: 20,
  },
  bio: {
    max_length: 160,
  },
  avatar: {
    max_size_bytes: 5 * 1024 * 1024,
    allowed_types: ["image/jpeg", "image/png", "image/webp"] as const,
  },
};

export interface ValidationResult<T> {
  ok: boolean;
  data?: T;
  errors?: Record<string, string>;
}

function normalizeNullableString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

type FieldValidationResult<T> =
  | { ok: true; value: T | undefined }
  | { ok: false; error: string };

function validateUsername(value: unknown): FieldValidationResult<string | null> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }

  if (value === null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return { ok: false, error: "Username must be a string" };
  }

  const normalized = value.trim().toLowerCase();

  if (normalized.length === 0) {
    return { ok: true, value: null };
  }

  if (normalized.length < profileValidation.username.min_length) {
    return {
      ok: false,
      error: `Username must be at least ${profileValidation.username.min_length} characters`,
    };
  }

  if (normalized.length > profileValidation.username.max_length) {
    return {
      ok: false,
      error: `Username must be at most ${profileValidation.username.max_length} characters`,
    };
  }

  if (!/^[a-z0-9._-]+$/.test(normalized)) {
    return {
      ok: false,
      error:
        "Username may only contain letters, numbers, periods, underscores, and hyphens",
    };
  }

  return { ok: true, value: normalized };
}

function validateBio(value: unknown): FieldValidationResult<string | null> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }

  if (value === null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return { ok: false, error: "Bio must be a string" };
  }

  const normalized = value.trim();

  if (normalized.length > profileValidation.bio.max_length) {
    return {
      ok: false,
      error: `Bio must be at most ${profileValidation.bio.max_length} characters`,
    };
  }

  return { ok: true, value: normalized.length > 0 ? normalized : null };
}

export function validateProfileUpdateInput(
  input: unknown,
): ValidationResult<ProfileUpdateInput> {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: { form: "Invalid profile payload" },
    };
  }

  const payload = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const data: ProfileUpdateInput = {};

  const username = validateUsername(payload.username);
  if (!username.ok) {
    errors.username = username.error;
  } else if (username.value !== undefined) {
    data.username = username.value;
  }

  const bio = validateBio(payload.bio);
  if (!bio.ok) {
    errors.bio = bio.error;
  } else if (bio.value !== undefined) {
    data.bio = bio.value;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function validateAvatarFile(file: unknown): ValidationResult<File> {
  if (!(file instanceof File)) {
    return {
      ok: false,
      errors: { file: "An image file is required" },
    };
  }

  if (
    !(profileValidation.avatar.allowed_types as readonly string[]).includes(
      file.type,
    )
  ) {
    return {
      ok: false,
      errors: {
        file: "Avatar must be a JPEG, PNG, or WebP image",
      },
    };
  }

  if (file.size > profileValidation.avatar.max_size_bytes) {
    return {
      ok: false,
      errors: {
        file: "Avatar must be 5 MB or smaller",
      },
    };
  }

  return { ok: true, data: file };
}

export function normalizeProfileUpdateInput(
  input: ProfileUpdateInput,
): ProfileUpdateInput {
  return {
    username: normalizeNullableString(input.username),
    bio: normalizeNullableString(input.bio),
  };
}
