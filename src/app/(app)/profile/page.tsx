"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Column,
  Grid,
  Heading,
  IconButton,
  Media,
  Row,
  SegmentedControl,
  Text,
  Badge,
} from "@once-ui-system/core";

export default function Profile() {
  const [tab, setTab] = useState("letters");

  return (
    <Column fillWidth horizontal="center" paddingY="xl">
      <Column maxWidth="m" fillWidth gap="48">
        {/* Hero */}
        <Column position="relative" fillWidth>
          <Media
            src="/images/backgrounds/profile-cover.jpg"
            alt="Profile cover"
            aspectRatio="4 / 1"
            radius="xl"
          />

          <Avatar
            src="/images/avatar.jpg"
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
            <IconButton icon="edit" tooltip="Edit profile" />
          </Row>
        </Column>

        {/* Identity */}
        <Column horizontal="center" gap="8" paddingTop="32">
          <Heading variant="display-default-s">
            Shubham Dave
          </Heading>

          <Text onBackground="neutral-weak">
            @shubham
          </Text>

          <Text
            variant="body-default-m"
            onBackground="neutral-medium"
            align="center"
          >
            Writing things worth remembering.
          </Text>

          <Row gap="16" marginTop="12">
            <Badge>34 Letters</Badge>
            <Badge>8 Collections</Badge>
            <Badge>Joined Jul 2026</Badge>
          </Row>
        </Column>

        {/* Tabs */}
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
            onToggle={setTab}
          />

          {/* LETTERS */}
          {tab === "letters" && (
            <Column maxWidth="s" fillWidth gap="32">
              <Column gap="12">
                <Heading as="h2" variant="heading-strong-m">
                  Currently Writing
                </Heading>

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
                      To My Future Self
                    </Text>

                    <Text
                      variant="body-default-s"
                      onBackground="neutral-medium"
                    >
                      Draft • 72%
                    </Text>
                  </Column>

                  <Button
                    label="Continue"
                    variant="secondary"
                    size="s"
                  />
                </Row>
              </Column>

              <Column gap="12">
                <Heading as="h2" variant="heading-strong-m">
                  Recent Letters
                </Heading>

                {[
                  "To Dad",
                  "The Night Before Graduation",
                  "To My Younger Self",
                ].map((letter) => (
                  <Row
                    key={letter}
                    fillWidth
                    paddingY="16"
                    horizontal="between"
                    borderBottom="neutral-alpha-weak"
                  >
                    <Column gap="4">
                      <Text weight="strong">
                        {letter}
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-medium"
                      >
                        Delivered
                      </Text>
                    </Column>

                    <Text
                      variant="label-default-s"
                      onBackground="neutral-weak"
                    >
                      Jul 2026
                    </Text>
                  </Row>
                ))}
              </Column>
            </Column>
          )}

          {/* COLLECTIONS */}
          {tab === "collections" && (
            <Grid columns={2} gap="16" maxWidth="s">
              {[
                "Family",
                "Future Me",
                "Travel",
                "Friends",
              ].map((collection) => (
                <Column
                  key={collection}
                  padding="20"
                  radius="l"
                  border="neutral-alpha-medium"
                  gap="4"
                >
                  <Heading variant="heading-strong-s">
                    {collection}
                  </Heading>

                  <Text
                    variant="body-default-s"
                    onBackground="neutral-medium"
                  >
                    8 letters
                  </Text>
                </Column>
              ))}
            </Grid>
          )}

          {/* ABOUT */}
          {tab === "about" && (
            <Column
              maxWidth="s"
              fillWidth
              gap="24"
            >
              <Column gap="8">
                <Heading as="h2">
                  About
                </Heading>

                <Text onBackground="neutral-medium">
                  Building PostLeaf. Writing letters to
                  people, places, and future versions of
                  myself.
                </Text>
              </Column>

              <Column gap="8">
                <Heading as="h2">
                  Account
                </Heading>

                <Row
                  fillWidth
                  horizontal="between"
                >
                  <Text>Email</Text>

                  <Text onBackground="neutral-medium">
                    shubham@example.com
                  </Text>
                </Row>

                <Row
                  fillWidth
                  horizontal="between"
                >
                  <Text>Member Since</Text>

                  <Text onBackground="neutral-medium">
                    July 2026
                  </Text>
                </Row>
              </Column>

              <Button
                label="Edit Profile"
                variant="secondary"
              />
            </Column>
          )}
        </Column>
      </Column>
    </Column>
  );
}