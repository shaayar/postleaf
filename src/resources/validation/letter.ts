import type {
  LetterCreateInput,
  LetterStatus,
  LetterUpdateInput,
  LetterVisibility,
} from "@/types";
import type { ValidationResult } from "./profile";

export const letterValidation = {
  title: {
    max_length: 140,
  },
  content: {
    min_length: 1,
    max_length: 100_000,
  },
  recipient_label: {
    max_length: 120,
  },
  collection: {
    max_length: 80,
  },
} as const;

const letterStatuses: LetterStatus[] = ["draft", "published", "archived"];
const letterVisibilities: LetterVisibility[] = ["private", "public", "unlisted"];

type FieldValidationResult<T> =
  | { ok: true; value: T | undefined }
  | { ok: false; error: string };

function validateNullableString(
  value: unknown,
  maxLength: number,
  label: string,
): FieldValidationResult<string | null> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }

  if (value === null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return { ok: false, error: `${label} must be a string` };
  }

  const normalized = value.trim();
  if (normalized.length === 0) {
    return { ok: true, value: null };
  }

  if (normalized.length > maxLength) {
    return {
      ok: false,
      error: `${label} must be at most ${maxLength} characters`,
    };
  }

  return { ok: true, value: normalized };
}

function validateStatus(value: unknown): FieldValidationResult<LetterStatus> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }

  if (typeof value !== "string" || !letterStatuses.includes(value as LetterStatus)) {
    return { ok: false, error: "Invalid letter status" };
  }

  return { ok: true, value: value as LetterStatus };
}

function validateVisibility(
  value: unknown,
): FieldValidationResult<LetterVisibility> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }

  if (
    typeof value !== "string" ||
    !letterVisibilities.includes(value as LetterVisibility)
  ) {
    return { ok: false, error: "Invalid letter visibility" };
  }

  return { ok: true, value: value as LetterVisibility };
}

export function validateLetterCreateInput(
  input: unknown,
): ValidationResult<LetterCreateInput> {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: { form: "Invalid letter payload" },
    };
  }

  const payload = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const data: LetterCreateInput = {
    content: "",
  };

  const title = validateNullableString(
    payload.title,
    letterValidation.title.max_length,
    "Title",
  );
  if (!title.ok) {
    errors.title = title.error;
  } else if (title.value !== undefined) {
    data.title = title.value;
  }

  const content =
    typeof payload.content === "string"
      ? payload.content.trim()
      : typeof payload.content === "number"
        ? String(payload.content).trim()
        : "";

  if (content.length < letterValidation.content.min_length) {
    errors.content = "Content cannot be empty";
  } else if (content.length > letterValidation.content.max_length) {
    errors.content = `Content must be at most ${letterValidation.content.max_length} characters`;
  } else {
    data.content = content;
  }

  const recipientLabel = validateNullableString(
    payload.recipient_label,
    letterValidation.recipient_label.max_length,
    "Recipient label",
  );
  if (!recipientLabel.ok) {
    errors.recipient_label = recipientLabel.error;
  } else if (recipientLabel.value !== undefined) {
    data.recipient_label = recipientLabel.value;
  }

  const collection = validateNullableString(
    payload.collection,
    letterValidation.collection.max_length,
    "Collection",
  );
  if (!collection.ok) {
    errors.collection = collection.error;
  } else if (collection.value !== undefined) {
    data.collection = collection.value;
  }

  const status = validateStatus(payload.status);
  if (!status.ok) {
    errors.status = status.error;
  } else if (status.value !== undefined) {
    data.status = status.value;
  }

  const visibility = validateVisibility(payload.visibility);
  if (!visibility.ok) {
    errors.visibility = visibility.error;
  } else if (visibility.value !== undefined) {
    data.visibility = visibility.value;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function validateLetterUpdateInput(
  input: unknown,
): ValidationResult<LetterUpdateInput> {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: { form: "Invalid letter payload" },
    };
  }

  const payload = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const data: LetterUpdateInput = {
    id: "",
  };

  if (typeof payload.id !== "string" || payload.id.trim().length === 0) {
    errors.id = "Letter id is required";
  } else {
    data.id = payload.id.trim();
  }

  const title = validateNullableString(
    payload.title,
    letterValidation.title.max_length,
    "Title",
  );
  if (!title.ok) {
    errors.title = title.error;
  } else if (title.value !== undefined) {
    data.title = title.value;
  }

  const content =
    typeof payload.content === "string"
      ? payload.content.trim()
      : typeof payload.content === "number"
        ? String(payload.content).trim()
        : undefined;

  if (content !== undefined) {
    if (content.length < letterValidation.content.min_length) {
      errors.content = "Content cannot be empty";
    } else if (content.length > letterValidation.content.max_length) {
      errors.content = `Content must be at most ${letterValidation.content.max_length} characters`;
    } else {
      data.content = content;
    }
  }

  const recipientLabel = validateNullableString(
    payload.recipient_label,
    letterValidation.recipient_label.max_length,
    "Recipient label",
  );
  if (!recipientLabel.ok) {
    errors.recipient_label = recipientLabel.error;
  } else if (recipientLabel.value !== undefined) {
    data.recipient_label = recipientLabel.value;
  }

  const collection = validateNullableString(
    payload.collection,
    letterValidation.collection.max_length,
    "Collection",
  );
  if (!collection.ok) {
    errors.collection = collection.error;
  } else if (collection.value !== undefined) {
    data.collection = collection.value;
  }

  const visibility = validateVisibility(payload.visibility);
  if (!visibility.ok) {
    errors.visibility = visibility.error;
  } else if (visibility.value !== undefined) {
    data.visibility = visibility.value;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function validateLetterStatusInput(
  input: unknown,
): ValidationResult<{ id: string; status: LetterStatus }> {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: { form: "Invalid letter status payload" },
    };
  }

  const payload = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const id =
    typeof payload.id === "string" && payload.id.trim().length > 0
      ? payload.id.trim()
      : "";

  if (id.length === 0) {
    errors.id = "Letter id is required";
  }

  if (payload.status === undefined) {
    errors.status = "Letter status is required";
  }

  const status = validateStatus(payload.status);
  if (!status.ok) {
    errors.status = status.error;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  if (!status.ok) {
    return {
      ok: false,
      errors: { status: "Invalid letter status" },
    };
  }

  return {
    ok: true,
    data: {
      id,
      status: status.value!,
    },
  };
}
