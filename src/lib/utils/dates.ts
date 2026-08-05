export function formatRelativeDate(date: Date, now = new Date()) {
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)} min ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays <= 7) {
    return `${diffDays} days ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function buildGroupLabel(date: Date, now = new Date()) {
  const startOfDay = (value: Date) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate());

  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays <= 7) {
    return "Last Week";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}
