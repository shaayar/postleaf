import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

import { getCurrentProfile, getLetterStats, getRecentLetters, listLetters } from "@/lib/queries";

function formatDisplayName(value: string | null | undefined) {
  const fallback = "there";
  const raw = value?.trim() || fallback;

  return raw
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getStatusLabel(status: string) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function getVisibilityLabel(visibility: string) {
  if (visibility === "public") {
    return "Public";
  }

  if (visibility === "unlisted") {
    return "Unlisted";
  }

  return "Private";
}

export default async function DashboardPage() {
  const [profile, recentLetters, stats, allLetters] = await Promise.all([
    getCurrentProfile(),
    getRecentLetters(4),
    getLetterStats(),
    listLetters({ limit: 200 }),
  ]);

  const displayName = formatDisplayName(profile?.full_name ?? profile?.username);
  const draftLetter =
    recentLetters.find((letter) => letter.status === "draft") ?? recentLetters[0];
  const draftHref = draftLetter ? `/write/${draftLetter.id}` : "/write";
  const collectionCount = new Set(
    allLetters
      .map((letter) => letter.collection?.trim())
      .filter((value): value is string => Boolean(value)),
  ).size;

  return (
    <Column gap="32">
      <Row fillWidth horizontal="between" vertical="center">
        <Column gap="8">
          <Heading variant="display-strong-s">Welcome back, {displayName}</Heading>
          <Text onBackground="neutral-weak">
            Ready to write something meaningful?
          </Text>
        </Column>

        <Button href="/write" prefixIcon="plus" label="New Letter" />
      </Row>

      <Column gap="16">
        <Heading variant="heading-strong-m">Continue Writing</Heading>

        <Column
          fillWidth
          gap="20"
          padding="24"
          radius="xl"
          background="surface"
          border="neutral-alpha-weak"
        >
          {draftLetter ? (
            <>
              <Column gap="8">
                <Text variant="heading-strong-s">
                  {draftLetter.title?.trim() || "Untitled Letter"}
                </Text>

                <Row gap="8" vertical="center">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {getStatusLabel(draftLetter.status)}
                  </Text>
                  <Text onBackground="neutral-weak">•</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Last edited {draftLetter.updated_at_label}
                  </Text>
                </Row>
              </Column>

              <Text variant="body-default-m" onBackground="neutral-medium">
                {draftLetter.excerpt}
              </Text>

              <Row>
                <Button
                  href={draftHref}
                  variant="secondary"
                  label="Continue Writing"
                  suffixIcon="arrowRight"
                />
              </Row>
            </>
          ) : (
            <>
              <Column gap="8">
                <Text variant="heading-strong-s">Start a new letter</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  You do not have any drafts yet. Begin a letter from the write
                  page whenever you are ready.
                </Text>
              </Column>

              <Row>
                <Button href="/write" variant="secondary" label="Write a Letter" />
              </Row>
            </>
          )}
        </Column>
      </Column>

      <Column gap="16">
        <Row horizontal="between" vertical="center">
          <Heading variant="heading-strong-m">Recent Letters</Heading>
          <Button
            href="/library"
            variant="tertiary"
            label="View All"
            suffixIcon="arrowRight"
          />
        </Row>

        {recentLetters.length > 0 ? (
          <Row fillWidth gap="16" wrap>
            {recentLetters.map((letter) => (
              <Column
                key={letter.id}
                flex={1}
                gap="16"
                padding="20"
                radius="xl"
                background="surface"
                border="neutral-alpha-weak"
              >
                <Column gap="8">
                  <Text variant="heading-strong-s">
                    {letter.title?.trim() || "Untitled Letter"}
                  </Text>

                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {letter.updated_at_label}
                  </Text>
                </Column>

                <Text variant="body-default-s" onBackground="neutral-medium">
                  {letter.excerpt}
                </Text>

                <Row fillWidth horizontal="between" vertical="center">
                  <Text variant="label-default-s" onBackground="brand-medium">
                    {getStatusLabel(letter.status)} •{" "}
                    {getVisibilityLabel(letter.visibility)}
                  </Text>

                  <Button
                    href={`/write/${letter.id}`}
                    variant="tertiary"
                    size="s"
                    suffixIcon="arrowRight"
                  >
                    Open
                  </Button>
                </Row>
              </Column>
            ))}
          </Row>
        ) : (
          <Column
            fillWidth
            gap="12"
            padding="24"
            radius="xl"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="heading-strong-s">No letters yet</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Your recent letters will appear here once you start writing.
            </Text>
          </Column>
        )}
      </Column>

      <Row fillWidth gap="16" wrap>
        <Column flex={1} gap="20" padding="24" radius="xl" background="surface" border="neutral-alpha-weak">
          <Column gap="8">
            <Heading variant="heading-strong-m">Library</Heading>
            <Text onBackground="neutral-weak">
              Your letter archive grows as you write, revisit, and preserve more
              moments.
            </Text>
          </Column>

          <Heading variant="display-strong-s">{stats.total_count}</Heading>
          <Text onBackground="neutral-medium">
            {collectionCount > 0
              ? `${collectionCount} collection${collectionCount === 1 ? "" : "s"}`
              : "No collections yet"}
          </Text>

          <Button
            href="/library"
            variant="secondary"
            label="Browse Library"
            suffixIcon="arrowRight"
          />
        </Column>

        <Column flex={1} gap="20" padding="24" radius="xl" background="surface" border="neutral-alpha-weak">
          <Column gap="8">
            <Heading variant="heading-strong-m">Community</Heading>
            <Text onBackground="neutral-weak">
              Read anonymous letters from people around the world.
            </Text>
          </Column>

          <Column gap="12">
            <Text>🚧 Coming Soon</Text>
            <Text onBackground="neutral-medium">
              Discover heartfelt stories, thoughtful reflections, and writing
              prompts shared by the community.
            </Text>
          </Column>

          <Button
            href="/community"
            variant="tertiary"
            label="Learn More"
            suffixIcon="arrowRight"
          />
        </Column>
      </Row>
    </Column>
  );
}
