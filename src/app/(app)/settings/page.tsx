"use client";

import { useState } from "react";

import {
  Button,
  Column,
  Fade,
  Heading,
  Input,
  Row,
  SegmentedControl,
  StylePanel,
  Text,
  Textarea,
} from "@once-ui-system/core";
import { MediaUpload } from "@once-ui-system/core";

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState("profile");

  return (
    <Row fill radius="l" overflow="hidden" gap="8">
      <Column
        fill
        background="surface"
        border="surface"
        paddingX="32"
        paddingBottom="32"
        overflowY="auto"
        horizontal="center"
      >
        <Column maxWidth="s">
          {/* Header */}
          <Column
            position="sticky"
            marginTop="16"
            top="0"
            zIndex={1}
            marginBottom="24"
          >
            <Fade
              fillWidth
              position="absolute"
              to="bottom"
              top="104"
              height={3}
              base="surface"
            />

            <Column fillWidth background="surface" paddingTop="16">

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
                ]}
                onToggle={setSelectedOption}
              />
            </Column>
          </Column>

          {/* PROFILE */}
          {selectedOption === "profile" && (
            <Column gap="32">
              <Column gap="4" paddingLeft="16">
                <Text variant="heading-strong-s">
                  Identity
                </Text>

                <Text
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  Manage how your profile appears.
                </Text>
              </Column>

              <Column gap="16">
                <Column gap="8">
                  <Text variant="label-default-s">
                    Avatar
                  </Text>

                  <MediaUpload
                    maxWidth={8}
                    radius="full"
                    aspectRatio="1 / 1"
                    initialPreviewImage="/images/creators/lorant.jpg"
                  />
                </Column>

                <Column gap="8">
                  <Text variant="label-default-s">
                    Cover
                  </Text>

                  <MediaUpload
                    maxWidth={16}
                    aspectRatio="16 / 9"
                    initialPreviewImage="/images/blocks/vibe-coding-dark.jpg"
                  />
                </Column>

                <Input
                  id="display-name"
                  label="Display Name"
                  placeholder="John Doe"
                />

                <Input
                  id="username"
                  label="Username"
                  placeholder="@your_username"
                />

                <Input
                  id="quote"
                  label="Quote"
                  placeholder="Writing things worth remembering."
                />

                <Textarea
                  id="bio"
                  label="Bio"
                  lines={5}
                  placeholder="Write a short bio about yourself..."
                >
                  
                </Textarea>

                <Row horizontal="end">
                  <Button label="Save Changes" />
                </Row>
              </Column>
            </Column>
          )}

          {/* WRITING */}
          {selectedOption === "writing" && (
            <Column gap="24">
              <Column gap="4" paddingLeft="16">
                <Text variant="heading-strong-s">
                  Writing Preferences
                </Text>

                <Text
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  Configure your writing experience.
                </Text>
              </Column>

              <Input
                id="default-collection"
                label="Default Collection"
                value="Inbox"
              />

              <Input
                id="default-privacy"
                label="Default Privacy"
                value="Private"
              />

              <Input
                id="autosave"
                label="Autosave"
                value="Every 5 seconds"
              />

              <Row horizontal="end">
                <Button
                  label="Save Preferences"
                  variant="secondary"
                />
              </Row>
            </Column>
          )}

          {/* ACCOUNT */}
          {selectedOption === "account" && (
            <Column gap="32">
              <Column gap="4" paddingLeft="16">
                <Text variant="heading-strong-s">
                  Account
                </Text>

                <Text
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  Manage your credentials and account.
                </Text>
              </Column>

              <Column gap="16">
                <Input
                  disabled
                  id="email"
                  label="Email"
                  value="support@once-ui.com"
                />

                <Button
                  variant="secondary"
                  label="Change Email"
                />

                <Input
                  disabled
                  autoComplete="new-password"
                  id="password"
                  label="Password"
                  value="••••••••••••••••"
                />

                <Button
                  variant="secondary"
                  label="Change Password"
                />
              </Column>

              <Column gap="12" marginTop="16">
                <Text variant="heading-strong-s">
                  Danger Zone
                </Text>

                <Button
                  variant="secondary"
                  label="Sign Out"
                />

                <Button
                  variant="danger"
                  label="Delete Account"
                />
              </Column>
            </Column>
          )}
        </Column>
      </Column>
    </Row>
  );
}