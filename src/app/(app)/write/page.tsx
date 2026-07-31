"use client";

import {
  Button,
  Column,
  // Combobox,
  Heading,
  IconButton,
  Input,
  Row,
  Select,
  SmartLink,
  Tag,
  Text,
  Textarea,
} from "@once-ui-system/core";

export default function WriteLetter() {
  return (
    <Column fillWidth horizontal="center" paddingY="xl">
      <Column maxWidth="m" fillWidth gap="32">
        {/* Top Bar */}
        <Row fillWidth horizontal="between" vertical="center">
          <SmartLink href="/letters">
            ← Back
          </SmartLink>

          <Row gap="12" vertical="center">
            <Text
              variant="body-default-s"
              onBackground="neutral-medium"
            >
              Saved just now
            </Text>

            <IconButton icon="ellipsis" />
          </Row>
        </Row>

        {/* Recipient */}
        <Column gap="12">
          <Heading variant="heading-strong-s">
            To
          </Heading>

          <Select
            id={"receiver"}
            placeholder="Who is this letter for?"
            options={[
              { "label": "Future Me", "value": "future-me" },
              { "label": "Past Me", "value": "past-me" },
              { "label": "Mom", "value": "mom" },
              { "label": "Dad", "value": "dad" },
              { "label": "Best Friend", "value": "best-friend" },
              { "label": "Anonymous", "value": "anonymous" },
              { "label": "Custom...", "value": "custom" },
            ]}
          />
        </Column>

        {/* Title */}
        <Column gap="12">
          <Heading variant="heading-strong-s">
            Title
          </Heading>

          <Input
            id="title"
            placeholder="The Day Everything Changed"
          />
        </Column>

        {/* Letter */}
        <Column gap="12">
          <Textarea
            id="letter"
            lines={20}
            placeholder={`Dear Future Me,

`}
          />
        </Column>

        {/* Metadata */}
        <Column gap="24">
          <Column gap="12">
            <Heading variant="heading-strong-s">
              Collection
            </Heading>

            <Select
              id={"collection"}
              options={[
                {
                  label: "Journal",
                  value: "journal",
                },
                {
                  label: "Family",
                  value: "family",
                },
                {
                  label: "Travel",
                  value: "travel",
                },
                {
                  label: "Work",
                  value: "work",
                },
              ]}
            />
          </Column>

          <Column gap="12">
            <Heading variant="heading-strong-s">
              Tags
            </Heading>

            <Row gap="8" wrap>
              <Tag label="Growth" />
              <Tag label="Career" />
              <Button
                size="s"
                variant="secondary"
                label="+ Add Tag"
              />
            </Row>
          </Column>

          <Row
            fillWidth
            horizontal="between"
            vertical="center"
          >
            <Text
              variant="body-default-s"
              onBackground="neutral-medium"
            >
              0 words
            </Text>

            <Button
              label="Seal Letter"
              size="m"
            />
          </Row>
        </Column>
      </Column>
    </Column>
  );
}