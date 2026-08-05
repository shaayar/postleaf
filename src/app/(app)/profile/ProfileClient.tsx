"use client";

import { useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Column,
  Grid,
  Heading,
  IconButton,
  Media,
  Row,
  SegmentedControl,
  Text,
} from "@once-ui-system/core";

import type { LetterListItem, LetterStats, Profile } from "@/types";

type CollectionSummary = {
  name: string;
  count: number;
};

function formatDisplayName(value: string | null | undefined) {
  const fallback = "Reader";
  const raw = value?.trim() || fallback;

  return raw
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatJoinedLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfileClient({
  profile,
  recentLetters,
  stats,
  collections,
}: {
  profile: Profile | null;
  recentLetters: LetterListItem[];
  stats: LetterStats;
  collections: CollectionSummary[];
}) {
  const [tab, setTab] = useState("letters");

  const displayName = formatDisplayName(profile?.full_name ?? profile?.username);
  const username = `@${profile?.username?.trim() || "reader"}`;
  const avatarSrc = profile?.avatar_url?.trim() || "/images/placeholder.png";
  const avatarValue = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const currentDraft =
    recentLetters.find((letter) => letter.status === "draft") ?? recentLetters[0];
  const currentDraftHref = currentDraft ? `/write/${currentDraft.id}` : "/write";

  return (
    <Column fillWidth horizontal="center" paddingY="xl">
      <Column maxWidth="m" fillWidth gap="48">
        <Column position="relative" fillWidth>
          <Media
            src="/images/backgrounds/profile-cover.jpg"
            alt="Profile cover"
            aspectRatio="4 / 1"
            radius="xl"
          />

          <Avatar
            src={avatarSrc}
            value={avatarValue}
            size="xl"
            borderWidth={8}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%, 50%)",
              borderColor: "var(--page-background)",
            }}
          />

          <Row position="absolute" top="16" right="16">
            <IconButton icon="edit" tooltip="Edit profile" href="/profile/edit" />
          </Row>
        </Column>

        <Column horizontal="center" gap="8" paddingTop="32">
          <Heading variant="display-default-s">{displayName}</Heading>
          <Text onBackground="neutral-weak">{username}</Text>
          <Text variant="body-default-m" onBackground="neutral-medium" align="center">
            {profile?.bio?.trim() || "Writing things worth remembering."}
          </Text>

          <Row gap="16" marginTop="12">
            <Badge>{stats.total_count} Letters</Badge>
            <Badge>{collections.length} Collections</Badge>
            <Badge>Joined {formatJoinedLabel(profile?.created_at || new Date().toISOString())}</Badge>
          </Row>
        </Column>

        <Column horizontal="center" gap="32">
          <SegmentedControl
            buttons={[
              {
                value: "letters",
                label: "Letters",
                prefixIcon: "mail",
              },
              {
                value: "collections",
                label: "Collections",
                prefixIcon: "bookmark",
              },
              {
                value: "about",
                label: "About",
                prefixIcon: "person",
              },
            ]}
            selected={tab}
            onToggle={setTab}
          />

          {tab === "letters" && (
            <Column maxWidth="s" fillWidth gap="32">
              <Column gap="12">
                <Heading as="h2" variant="heading-strong-m">
                  Currently Writing
                </Heading>

                {currentDraft ? (
                  <Row
                    fillWidth
                    padding="20"
                    radius="l"
                    border="neutral-alpha-medium"
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="4">
                      <Text weight="strong">
                        {currentDraft.title?.trim() || "Untitled Letter"}
                      </Text>

                      <Text variant="body-default-s" onBackground="neutral-medium">
                        {currentDraft.status === "draft" ? "Draft" : "Letter"} •{" "}
                        {currentDraft.updated_at_label}
                      </Text>
                    </Column>

                    <Button
                      href={currentDraftHref}
                      label="Continue"
                      variant="secondary"
                      size="s"
                    />
                  </Row>
                ) : (
                  <Column
                    fillWidth
                    padding="20"
                    radius="l"
                    border="neutral-alpha-medium"
                    gap="8"
                  >
                    <Text weight="strong">No draft in progress</Text>
                    <Text variant="body-default-s" onBackground="neutral-medium">
                      Start a new letter whenever you are ready.
                    </Text>
                  </Column>
                )}
              </Column>

              <Column gap="12">
                <Heading as="h2" variant="heading-strong-m">
                  Recent Letters
                </Heading>

                {recentLetters.length > 0 ? (
                  recentLetters.map((letter) => (
                    <Row
                      key={letter.id}
                      fillWidth
                      paddingY="16"
                      horizontal="between"
                      borderBottom="neutral-alpha-weak"
                    >
                      <Column gap="4">
                        <Text weight="strong">
                          {letter.title?.trim() || "Untitled Letter"}
                        </Text>

                        <Text variant="body-default-s" onBackground="neutral-medium">
                          {letter.excerpt}
                        </Text>
                      </Column>

                      <Row gap="12" vertical="center">
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {letter.updated_at_label}
                        </Text>
                        <Button
                          href={`/write/${letter.id}`}
                          label="Open"
                          variant="tertiary"
                          size="s"
                        />
                      </Row>
                    </Row>
                  ))
                ) : (
                  <Text onBackground="neutral-medium">No letters yet.</Text>
                )}
              </Column>
            </Column>
          )}

          {tab === "collections" && (
            <Grid columns={2} gap="16" maxWidth="s">
              {collections.length > 0 ? (
                collections.map((collection) => (
                  <Column
                    key={collection.name}
                    padding="20"
                    radius="l"
                    border="neutral-alpha-medium"
                    gap="4"
                  >
                    <Heading variant="heading-strong-s">{collection.name}</Heading>
                    <Text variant="body-default-s" onBackground="neutral-medium">
                      {collection.count} letter{collection.count === 1 ? "" : "s"}
                    </Text>
                  </Column>
                ))
              ) : (
                <Column
                  style={{ gridColumn: "1 / -1" }}
                  padding="20"
                  radius="l"
                  border="neutral-alpha-medium"
                  gap="4"
                >
                  <Heading variant="heading-strong-s">No collections yet</Heading>
                  <Text variant="body-default-s" onBackground="neutral-medium">
                    Collections will appear here once you start grouping letters.
                  </Text>
                </Column>
              )}
            </Grid>
          )}

          {tab === "about" && (
            <Column maxWidth="s" fillWidth gap="24">
              <Column gap="8">
                <Heading as="h2">About</Heading>
                <Text onBackground="neutral-medium">
                  {profile?.bio?.trim() ||
                    "Building PostLeaf. Writing letters to people, places, and future versions of myself."}
                </Text>
              </Column>

              <Column gap="8">
                <Heading as="h2">Account</Heading>

                <Row fillWidth horizontal="between">
                  <Text>Email</Text>
                  <Text onBackground="neutral-medium">Available in the account menu</Text>
                </Row>

                <Row fillWidth horizontal="between">
                  <Text>Member Since</Text>
                  <Text onBackground="neutral-medium">
                    {profile?.created_at ? formatJoinedLabel(profile.created_at) : "Unknown"}
                  </Text>
                </Row>
              </Column>

              <Button href="/profile/edit" label="Edit Profile" variant="secondary" />
            </Column>
          )}
        </Column>
      </Column>
    </Column>
  );
}
