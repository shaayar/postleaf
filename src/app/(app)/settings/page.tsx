"use client";

import { ReactNode, useState } from "react";
import {
  Button,
  Column,
  Row,
  Text,
  SegmentedControl,
  Input,
  Textarea,
  MediaUpload,
} from "@once-ui-system/core";

import { useUser } from "@/components/UserProvider";

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Column
      gap="24"
      padding="24"
      radius="l"
      border="neutral-alpha-medium"
      background="surface"
    >
      <Column gap="4">
        <Text variant="heading-strong-s">{title}</Text>

        <Text
          variant="body-default-s"
          onBackground="neutral-weak"
        >
          {description}
        </Text>
      </Column>

      {children}
    </Column>
  );
}

export default function Settings() {
  const [selectedOption, setSelectedOption] =
    useState("profile");

  const { profile, userEmail } = useUser();

  function formatDisplayName(value: string) {
    return value
      .split(/[._-]+/g)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join(" ");
  }

  const rawHandle =
    profile?.username?.trim() ||
    userEmail?.split("@")[0]?.trim() ||
    "reader";

  const displayName = formatDisplayName(rawHandle);

  const username = `@${rawHandle.toLowerCase()}`;

  const avatarSrc =
    profile?.avatar_url?.trim() || '/images/placeholder.png';

  const avatarValue = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Row fill radius="l" overflow="hidden">
      <Column
        fill
        horizontal="center"
        background="surface"
        border="surface"
        overflowY="auto"
        paddingX="32"
        paddingBottom="48"
      >
        <Column
          fillWidth
          maxWidth="m"
          gap="32"
          paddingTop="24"
        >
          {/* Page Header */}

          <Column gap="8">
            <Text variant="display-strong-s">
              Settings
            </Text>

            <Text
              variant="body-default-m"
              onBackground="neutral-weak"
            >
              Manage your profile, writing
              preferences, account, and privacy.
            </Text>
          </Column>

          {/* Navigation */}

          <SegmentedControl
            buttons={[
              {
                label: "Profile",
                value: "profile",
              },
              {
                label: "Writing",
                value: "writing",
              },
              {
                label: "Account",
                value: "account",
              },
              {
                label: "Privacy",
                value: "privacy",
              },
            ]}
            onToggle={setSelectedOption}
          />

          {/* Profile */}

          {selectedOption === "profile" && (
            <Column gap="24">
              <SectionCard
                title="Identity"
                description="Manage how your profile appears across PostLeaf."
              >
                <Column gap="24">
                  <Row vertical="center" gap="20">
                    <MediaUpload
                      sizes="s"
                    />

                    <Column gap="4">
                      <Text variant="heading-strong-m">
                        {displayName}
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        {username}
                      </Text>

                      <Button
                        label="Change Photo"
                        variant="secondary"
                        size="s"
                      />
                    </Column>
                  </Row>

                  <Input
                    id="display-name"
                    label="Display Name"
                    value={displayName}
                  />

                  <Input
                    id="username"
                    label="Username"
                    value={username.replace("@", "")}
                  />

                  <Textarea
                    id="bio"
                    label="Bio"
                    description="Tell people a little about yourself."
                    value=""
                    lines={4}
                  />

                  <Row horizontal="end">
                    <Button
                      label="Save Changes"
                      variant="primary"
                      onClick={() => {
                        // Handle save changes logic here
                        // handleEditProfile({
                        //   displayName,
                        //   username: username.replace("@", ""),
                        //   bio: "",
                        //   location: "",
                        // });
                      }}
                    />
                  </Row>
                </Column>
              </SectionCard>

              <SectionCard
                title="Public Profile"
                description="Optional information visible on your public profile."
              >
                <Input
                  id="location"
                  label="Location"
                  placeholder="State, Country"
                />

                <Row horizontal="end">
                  <Button
                    label="Save Profile"
                    variant="secondary"
                  />
                </Row>
              </SectionCard>
            </Column>
          )}

          {/* Writing */}

          {selectedOption === "writing" && (
            <Column gap="24">
              <SectionCard
                title="Defaults"
                description="Choose how every new letter should begin."
              >
                <Column gap="20">
                  <Input
                    id="default-collection"
                    label="Default Collection"
                    value="Inbox"
                  />

                  <SegmentedControl
                    buttons={[
                      {
                        label: "Private",
                        value: "private",
                      },
                      {
                        label: "Unlisted",
                        value: "unlisted",
                      },
                      {
                        label: "Public",
                        value: "public",
                      },
                    ]}
                    onToggle={() => { }}
                  />

                  <Row horizontal="end">
                    <Button
                      label="Save Defaults"
                      variant="primary"
                    />
                  </Row>
                </Column>
              </SectionCard>

              <SectionCard
                title="Editor"
                description="Personalize your writing experience."
              >
                <Column gap="24">
                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="2">
                      <Text variant="body-strong-m">
                        Autosave
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        Automatically save while writing.
                      </Text>
                    </Column>

                    <Button
                      size="s"
                      variant="secondary"
                      label="Enabled"
                    />
                  </Row>

                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="2">
                      <Text variant="body-strong-m">
                        Spell Check
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        Highlight spelling mistakes.
                      </Text>
                    </Column>

                    <Button
                      size="s"
                      variant="secondary"
                      label="Enabled"
                    />
                  </Row>

                  <Column gap="8">
                    <Text variant="body-strong-m">
                      Editor Width
                    </Text>

                    <SegmentedControl
                      buttons={[
                        {
                          label: "Narrow",
                          value: "narrow",
                        },
                        {
                          label: "Medium",
                          value: "medium",
                        },
                        {
                          label: "Wide",
                          value: "wide",
                        },
                      ]}
                      onToggle={() => { }}
                    />
                  </Column>

                  <Row horizontal="end">
                    <Button
                      label="Save Preferences"
                      variant="primary"
                    />
                  </Row>
                </Column>
              </SectionCard>
            </Column>
          )}

          {/* Account */}

          {selectedOption === "account" && (
            <Column gap="24">
              <SectionCard
                title="Credentials"
                description="Manage your email address and password."
              >
                <Column gap="20">
                  <Input
                    disabled
                    id="email"
                    label="Email Address"
                    value={userEmail ?? ""}
                  />

                  <Row horizontal="end">
                    <Button
                      label="Change Email"
                      variant="secondary"
                    />
                  </Row>

                  <Input
                    disabled
                    autoComplete="new-password"
                    id="password"
                    label="Password"
                    value="••••••••••••••••"
                  />

                  <Row horizontal="end">
                    <Button
                      label="Change Password"
                      variant="secondary"
                    />
                  </Row>
                </Column>
              </SectionCard>

              <SectionCard
                title="Account"
                description="Manage your current session."
              >
                <Column gap="20">
                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="2">
                      <Text variant="body-strong-m">
                        Current Session
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        You're currently signed in on this device.
                      </Text>
                    </Column>

                    <Button
                      label="Sign Out"
                      variant="secondary"
                    />
                  </Row>
                </Column>
              </SectionCard>
            </Column>
          )}

          {/* Privacy */}

          {selectedOption === "privacy" && (
            <Column gap="24">
              <SectionCard
                title="Export Data"
                description="Download a copy of your letters and account data."
              >
                <Column gap="20">
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                  >
                    We'll prepare an archive containing your letters,
                    collections, profile information, and account data.
                  </Text>

                  <Row horizontal="end">
                    <Button
                      label="Export Data"
                      variant="secondary"
                    />
                  </Row>
                </Column>
              </SectionCard>

              <SectionCard
                title="Privacy"
                description="Control how your profile appears to others."
              >
                <Column gap="24">
                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="2">
                      <Text variant="body-strong-m">
                        Public Profile
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        Allow others to discover your profile.
                      </Text>
                    </Column>

                    <Button
                      label="Private"
                      size="s"
                      variant="secondary"
                    />
                  </Row>

                  <Row
                    fillWidth
                    horizontal="between"
                    vertical="center"
                  >
                    <Column gap="2">
                      <Text variant="body-strong-m">
                        Search Visibility
                      </Text>

                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        Let your profile appear in search results.
                      </Text>
                    </Column>

                    <Button
                      label="Enabled"
                      size="s"
                      variant="secondary"
                    />
                  </Row>

                  <Row horizontal="end">
                    <Button
                      label="Save Privacy"
                      variant="primary"
                    />
                  </Row>
                </Column>
              </SectionCard>

              <SectionCard
                title="Danger Zone"
                description="These actions are permanent and cannot be undone."
              >
                <Column gap="20">
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                  >
                    Deleting your account permanently removes your
                    profile, collections, and every letter you've
                    written. This action cannot be reversed.
                  </Text>

                  <Row horizontal="end">
                    <Button
                      label="Delete Account"
                      variant="danger"
                    />
                  </Row>
                </Column>
              </SectionCard>
            </Column>
          )}
        </Column>
      </Column>
    </Row>
  );
}