export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function buildExcerpt(content: string) {
  const normalized = content.trim();
  if (!normalized) {
    return "";
  }

  const paragraphs = normalized
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return normalizeWhitespace(paragraphs[0]);
  }

  const collapsed = normalizeWhitespace(normalized);
  if (collapsed.length <= 180) {
    return collapsed;
  }

  return `${collapsed.slice(0, 180).trimEnd()}…`;
}

export function countWords(content: string) {
  const normalized = normalizeWhitespace(content);
  if (!normalized) {
    return 0;
  }

  return normalized.split(" ").filter(Boolean).length;
}

export function countCharacters(content: string) {
  return content.trim().length;
}
