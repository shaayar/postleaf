import { Button, Column, Row, Text } from "@once-ui-system/core";

import { listPublicLetters } from "@/lib/queries";

function formatPublishedLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function PublicLetterItem({
  title,
  excerpt,
  published_at,
}: {
  title: string | null;
  excerpt: string;
  published_at: string;
}) {
  return (
    <Column
      fillWidth
      paddingX="m"
      paddingY="s"
      borderBottom="neutral-alpha-weak"
      style={{
        transition: "background-color 180ms ease, transform 180ms ease",
      }}
    >
      <Column gap="xs" fillWidth>
        <Row fillWidth horizontal="between" vertical="start">
          <Text variant="heading-strong-l">
            {title?.trim() || "Untitled Letter"}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" paddingTop="4">
            {formatPublishedLabel(published_at)}
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
          {excerpt}
        </Text>
      </Column>
    </Column>
  );
}

export default async function DiscoverPage() {
  const publicLetters = await listPublicLetters(50);

  return (
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
          <Text variant="display-strong-s">Discover</Text>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Anonymous public letters, published as frozen snapshots from private writing.
          </Text>
        </Column>

        {publicLetters.length > 0 ? (
          <Column gap="32">
            <Column>
              {publicLetters.map((letter) => (
                <PublicLetterItem
                  key={letter.id}
                  title={letter.title}
                  excerpt={letter.excerpt}
                  published_at={letter.published_at}
                />
              ))}
            </Column>
          </Column>
        ) : (
          <Column fillWidth gap="16" paddingY="80" paddingX="8" maxWidth="s">
            <Text variant="display-strong-xs">No public letters yet.</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              When letters are published, they will appear here as anonymous snapshots.
            </Text>
            <Row>
              <Button href="/write" label="Write a Letter" />
            </Row>
          </Column>
        )}
      </Column>
    </Column>
  );
}
