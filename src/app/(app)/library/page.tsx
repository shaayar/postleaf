"use client";

import { useMemo, useState } from "react";

import { Button, Column, Input, Row, SegmentedControl, SmartLink, Text } from "@once-ui-system/core";

type LetterStatus = "draft" | "published" | "archived";

type Letter = {
  id: string;
  title: string;
  content: string;
  status: LetterStatus;
  updatedAt: string;
  href: string;
};

type FilterValue = "all" | LetterStatus;

const letters: Letter[] = [
  {
    id: "future-self",
    title: "To My Future Self",
    content:
      "Dear future me,\n\nI hope you are still keeping the small promises that felt fragile when I first wrote them. The quiet routines, the long walks, the pages you almost skipped. Those were never small things at all.",
    status: "draft",
    updatedAt: "2026-08-03T10:20:00.000Z",
    href: "/write",
  },
  {
    id: "mom",
    title: "Dear Mom",
    content:
      "Dear Mom,\n\nThere are things I have never managed to say out loud, mostly because they felt too ordinary to name while I was living them. But ordinary is what made them beautiful.",
    status: "published",
    updatedAt: "2026-08-03T06:40:00.000Z",
    href: "/write",
  },
  {
    id: "younger-self",
    title: "A Letter to My Younger Self",
    content:
      "If I could sit beside the version of me from five years ago, I would tell him that confusion is not failure. I would tell him that becoming someone new is often quiet work.",
    status: "draft",
    updatedAt: "2026-08-02T18:15:00.000Z",
    href: "/write",
  },
  {
    id: "why-postleaf",
    title: "Why I Started Building PostLeaf",
    content:
      "PostLeaf began with a simple question: what if letters could feel permanent again? Not trapped, not archived away, but preserved with the kind of care we usually reserve for things we love.",
    status: "archived",
    updatedAt: "2026-07-29T14:05:00.000Z",
    href: "/write",
  },
  {
    id: "birthday",
    title: "Happy Birthday, Mom",
    content:
      "Happy birthday, Mom.\n\nI keep returning to the same memory of your kitchen light at dusk, the sound of a spoon against a glass, and the feeling that home was something you quietly made for everyone else.",
    status: "published",
    updatedAt: "2026-07-18T09:00:00.000Z",
    href: "/write",
  },
  {
    id: "travel-note",
    title: "The Train Platform at 6 A.M.",
    content:
      "At six in the morning, the platform felt half asleep. I stood there with a paper cup warming my hands and thought about how many lives begin in places no one photographs.",
    status: "draft",
    updatedAt: "2026-06-22T16:30:00.000Z",
    href: "/write",
  },
];

function buildExcerpt(content: string) {
  const normalized = content.trim();
  if (!normalized) return "";

  const paragraphs = normalized
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs[0];
  }

  return normalized.length > 180
    ? `${normalized.slice(0, 180).trimEnd()}…`
    : normalized;
}

function formatGroupLabel(date: Date, now: Date) {
  const startOfDay = (value: Date) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate());

  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) /
    (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last Week";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatEditedLabel(date: Date, now: Date) {
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

  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) {
    return `${diffDays} days ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getMetadata(letter: Letter) {
  if (letter.status === "draft") {
    return "Draft";
  }

  if (letter.status === "published") {
    return "Published • Public";
  }

  return "Archived • Private";
}

function LetterItem({
  letter,
  updatedLabel,
}: {
  letter: Letter;
  updatedLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const excerpt = buildExcerpt(letter.content);

  return (
    <SmartLink
      href={letter.href}
      unstyled
      className="library-item-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", textDecoration: "none" }}
      fillWidth
      >
      <Column
        paddingX="m"
        paddingY="s"
        fillWidth
        borderBottom="neutral-alpha-weak"
        transition="micro-medium"
        style={{
          background: hovered ? "rgba(127, 127, 127, 0.06)" : "transparent",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <Row horizontal="between" vertical="start" gap="16" fillWidth>
          <Column
            gap="xs"
            fillWidth
            horizontal="between"
            >
            <Row fillWidth horizontal="between" vertical="start">
              <Text variant="heading-strong-l">{letter.title}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" paddingTop="4">
                {getMetadata(letter)}
              </Text>
            </Row>

            <Row>
              <Text
                variant="body-default-m"
                onBackground="neutral-medium"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {excerpt}
              </Text>
            </Row>
          </Column>
        </Row>

        <Text variant="body-default-xs" onBackground="neutral-weak" marginTop="2">
          Last edited: {updatedLabel}
        </Text>
      </Column>
    </SmartLink>
  );
}

export default function LibraryPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  const filteredLetters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return letters
      .filter((letter) => {
        const matchesFilter =
          selectedFilter === "all" || letter.status === selectedFilter;
        const haystack = [
          letter.title,
          letter.content,
          getMetadata(letter),
        ]
          .join(" ")
          .toLowerCase();

        const matchesQuery =
          normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

        return matchesFilter && matchesQuery;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [query, selectedFilter]);

  const groupedLetters = useMemo(() => {
    const now = new Date();
    const groups = new Map<
      string,
      Array<{ letter: Letter; updatedAt: Date; label: string }>
    >();

    for (const letter of filteredLetters) {
      const updatedAt = new Date(letter.updatedAt);
      const label = formatGroupLabel(updatedAt, now);

      if (!groups.has(label)) {
        groups.set(label, []);
      }

      groups.get(label)?.push({
        letter,
        updatedAt,
        label: formatEditedLabel(updatedAt, now),
      });
    }

    return Array.from(groups.entries()).map(([label, items]) => ({
      label,
      items,
    }));
  }, [filteredLetters]);

  const hasResults = filteredLetters.length > 0;

  return (
    <Row fill radius="l" overflow="hidden">
      <Column
        fillWidth
        horizontal="center"
        background="surface"
        border="surface"
        overflowY="auto"
        paddingBottom="48"
      >
        <Column fillWidth maxWidth="l" gap="24" paddingTop="24">
          <Column gap="8">
            <Text variant="display-strong-s">Library</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Browse every letter you've written, from first drafts to lasting
              memories.
            </Text>
          </Column>

          <Column gap="16">
            <Input
              id="library-search"
              label="Search letters"
              placeholder="Search titles, excerpts, or metadata"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <SegmentedControl
              buttons={[
                { label: "All", value: "all" },
                { label: "Drafts", value: "drafts" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
              ]}
              selected={selectedFilter}
              onToggle={(value) => setSelectedFilter(value as FilterValue)}
            />
          </Column>

          {hasResults ? (
            <Column gap="32">
              {groupedLetters.map((group) => (
                <Column key={group.label}>
                  <Text variant="label-default-xl" onBackground="neutral-weak">
                    {group.label}
                  </Text>

                  <Column>
                    {group.items.map(({ letter, label }) => (
                      <LetterItem
                        key={letter.id}
                        letter={letter}
                        updatedLabel={label}
                      />
                    ))}
                  </Column>
                </Column>
              ))}
            </Column>
          ) : (
            <Column
              fillWidth
              gap="16"
              paddingY="80"
              paddingX="8"
              maxWidth="s"
            >
              <Text variant="display-strong-xs">Your library is empty.</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Every letter you write becomes part of your story. When you're
                ready, your first letter will begin your library.
              </Text>
              <Row>
                <Button href="/write" label="Write Your First Letter" />
              </Row>
            </Column>
          )}
        </Column>
      </Column>

      <style jsx>{`
        .library-item-link:hover :global([data-library-item="row"]) {
          background: rgba(127, 127, 127, 0.06);
        }
      `}</style>
    </Row>
  );
}
