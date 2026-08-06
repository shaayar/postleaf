import { Button, Column, Row, SmartLink, Text } from "@once-ui-system/core";

import type { LetterListItem } from "@/types";
import { listLetters } from "@/lib/queries";
import { buildGroupLabel } from "@/lib/utils/dates";

function getArchiveLabel(letter: LetterListItem) {
  if (letter.status === "published") {
    return "Published • Public";
  }

  return "Archived • Private";
}

function ArchiveItem({ letter }: { letter: LetterListItem }) {
  return (
    <SmartLink
      href={`/write/${letter.id}`}
      unstyled
      style={{ display: "block", textDecoration: "none" }}
      fillWidth
    >
      <Column
        fillWidth
        paddingX="m"
        paddingY="s"
        borderBottom="neutral-alpha-weak"
        style={{
          transition: "background-color 180ms ease, transform 180ms ease",
        }}
        className="archive-item"
      >
        <Row horizontal="between" vertical="start" gap="16" fillWidth>
          <Column gap="xs" fillWidth>
            <Row fillWidth horizontal="between" vertical="start">
              <Text variant="heading-strong-l">
                {letter.title?.trim() || "Untitled Letter"}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak" paddingTop="4">
                {getArchiveLabel(letter)}
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

export default async function ArchivePage() {
  const archivedLetters = await listLetters({ status: "archived", limit: 200 });

  const groupedLetters = (() => {
    const now = new Date();
    const groups = new Map<string, LetterListItem[]>();

    for (const letter of archivedLetters) {
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
  })();

  return (
    <Column fillWidth horizontal="center" background="surface" border="surface" overflowY="auto" paddingBottom="48">
      <Column fillWidth maxWidth="l" gap="24" paddingTop="24">
        <Column gap="8">
          <Text variant="display-strong-s">Archive</Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Letters you’ve set aside, preserved for later, or tucked away for safekeeping.
          </Text>
        </Column>

        {archivedLetters.length > 0 ? (
          <Column gap="32">
            {groupedLetters.map((group) => (
              <Column key={group.label}>
                <Text variant="label-default-xl" onBackground="neutral-weak">
                  {group.label}
                </Text>

                <Column>
                  {group.items.map((letter) => (
                    <ArchiveItem key={letter.id} letter={letter} />
                  ))}
                </Column>
              </Column>
            ))}
          </Column>
        ) : (
          <Column fillWidth gap="16" paddingY="80" paddingX="8" maxWidth="s">
            <Text variant="display-strong-xs">Your archive is empty.</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Archived letters will appear here when you choose to set them aside.
            </Text>
            <Row>
              <Button href="/library" label="Browse Library" />
            </Row>
          </Column>
        )}
      </Column>
    </Column>
  );
}
