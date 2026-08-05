"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Column,
  Input,
  Row,
  SegmentedControl,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import type { LetterListItem, LetterStatus } from "@/types";
import { buildGroupLabel } from "@/lib/utils/dates";

type FilterValue = "all" | LetterStatus;

function getStatusLabel(letter: LetterListItem) {
  if (letter.status === "published") {
    return "Published • Public";
  }

  if (letter.status === "archived") {
    return "Archived • Private";
  }

  return "Draft • Private";
}

function LetterItem({ letter }: { letter: LetterListItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <SmartLink
      href={`/write/${letter.id}`}
      unstyled
      style={{ display: "block", textDecoration: "none" }}
      fillWidth
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
          <Column gap="xs" fillWidth>
            <Row fillWidth horizontal="between" vertical="start">
              <Text variant="heading-strong-l">
                {letter.title?.trim() || "Untitled Letter"}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak" paddingTop="4">
                {getStatusLabel(letter)}
              </Text>
            </Row>

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
              {letter.excerpt}
            </Text>
          </Column>
        </Row>

        <Text variant="body-default-xs" onBackground="neutral-weak" marginTop="2">
          Last edited: {letter.updated_at_label}
        </Text>
      </Column>
    </SmartLink>
  );
}

export default function LibraryClient({
  letters,
}: {
  letters: LetterListItem[];
}) {
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
          letter.excerpt,
          letter.recipient_label,
          letter.collection,
          getStatusLabel(letter),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesQuery =
          normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

        return matchesFilter && matchesQuery;
      })
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
  }, [letters, query, selectedFilter]);

  const groupedLetters = useMemo(() => {
    const now = new Date();
    const groups = new Map<string, LetterListItem[]>();

    for (const letter of filteredLetters) {
      const label = buildGroupLabel(new Date(letter.updated_at), now);

      if (!groups.has(label)) {
        groups.set(label, []);
      }

      groups.get(label)?.push(letter);
    }

    return Array.from(groups.entries()).map(([label, items]) => ({
      label,
      items,
    }));
  }, [filteredLetters]);

  const hasResults = filteredLetters.length > 0;

  return (
    <Column fillWidth horizontal="center" background="surface" border="surface" overflowY="auto" paddingBottom="48">
      <Column fillWidth maxWidth="l" gap="24" paddingTop="24">
        <Column gap="8">
          <Text variant="display-strong-s">Library</Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Browse every letter you've written, from first drafts to lasting memories.
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
              { label: "Drafts", value: "draft" },
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
                  {group.items.map((letter) => (
                    <LetterItem key={letter.id} letter={letter} />
                  ))}
                </Column>
              </Column>
            ))}
          </Column>
        ) : (
          <Column fillWidth gap="16" paddingY="80" paddingX="8" maxWidth="s">
            <Text variant="display-strong-xs">Your library is empty.</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Every letter you write becomes part of your story. When you're ready,
              your first letter will begin your library.
            </Text>
            <Row>
              <Button href="/write" label="Write Your First Letter" />
            </Row>
          </Column>
        )}
      </Column>
    </Column>
  );
}
