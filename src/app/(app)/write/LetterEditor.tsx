"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Column,
  Heading,
  IconButton,
  Input,
  Row,
  Select,
  SmartLink,
  Tag,
  Text,
  Textarea,
  useToast,
} from "@once-ui-system/core";

import type { LetterDetail } from "@/types";
import { createLetterAction, updateLetterAction } from "./actions";

type Mode = "create" | "edit";

function getDefaultReceiver(value: string | null | undefined) {
  return value?.trim() || "future-me";
}

function getDefaultCollection(value: string | null | undefined) {
  return value?.trim() || "journal";
}

function getLetterTitle(letter: LetterDetail | null) {
  return letter?.title?.trim() || "Untitled Letter";
}

export default function LetterEditor({
  mode,
  letter,
}: {
  mode: Mode;
  letter?: LetterDetail | null;
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const [title, setTitle] = useState(letter?.title ?? "");
  const [content, setContent] = useState(letter?.content ?? "");
  const [receiver, setReceiver] = useState(getDefaultReceiver(letter?.recipient_label));
  const [collection, setCollection] = useState(getDefaultCollection(letter?.collection));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedLabel, setLastSavedLabel] = useState(
    mode === "edit" && letter ? `Last saved ${letter.updated_at_label}` : "Saved as draft",
  );

  const isEditing = mode === "edit" && Boolean(letter);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isEditing && letter) {
        const saved = await updateLetterAction({
          id: letter.id,
          title,
          content,
          recipient_label: receiver,
          collection,
        });

        setLastSavedLabel("Updated just now");
        addToast({
          variant: "success",
          message: `Updated ${getLetterTitle(saved)}.`,
        });
        router.refresh();
        return;
      }

      const created = await createLetterAction({
        title,
        content,
        recipient_label: receiver,
        collection,
      });

      setLastSavedLabel("Saved just now");
      addToast({
        variant: "success",
        message: `Saved ${getLetterTitle(created)}.`,
      });
      router.replace(`/write/${created.id}`);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save letter";

      setError(message);
      addToast({
        variant: "danger",
        message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Column fillWidth horizontal="center" paddingY="xl">
      <Column maxWidth="m" fillWidth gap="32">
        <Row fillWidth horizontal="between" vertical="center">
          <SmartLink href="/library">← Back to Library</SmartLink>

          <Row gap="12" vertical="center">
            <Text variant="body-default-s" onBackground="neutral-medium">
              {lastSavedLabel}
            </Text>

            <IconButton icon="ellipsis" />
          </Row>
        </Row>

        <form onSubmit={handleSubmit}>
          <Column gap="32">
            <Column gap="8">
              <Heading variant="display-strong-s">
                {isEditing ? "Edit Letter" : "Write"}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-medium">
                {isEditing
                  ? "Refine an existing letter without losing its original rhythm."
                  : "Start a new letter and return to it whenever the words need more time."}
              </Text>
            </Column>

            <Column gap="12">
              <Heading variant="heading-strong-s">To</Heading>

              <Select
                id="receiver"
                value={receiver}
                onSelect={(value) => setReceiver(String(value))}
                options={[
                  { label: "Future Me", value: "future-me" },
                  { label: "Past Me", value: "past-me" },
                  { label: "Mom", value: "mom" },
                  { label: "Dad", value: "dad" },
                  { label: "Best Friend", value: "best-friend" },
                  { label: "Anonymous", value: "anonymous" },
                  { label: "Custom...", value: "custom" },
                ]}
                placeholder="Who is this letter for?"
              />
            </Column>

            <Column gap="12">
              <Heading variant="heading-strong-s">Title</Heading>

              <Input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="The Day Everything Changed"
              />
            </Column>

            <Column gap="12">
              <Textarea
                id="letter"
                lines={20}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={`Dear Future Me,\n\n`}
              />
            </Column>

            <Column gap="24">
              <Column gap="12">
                <Heading variant="heading-strong-s">Collection</Heading>

                <Select
                  id="collection"
                  value={collection}
                  onSelect={(value) => setCollection(String(value))}
                  options={[
                    { label: "Journal", value: "journal" },
                    { label: "Family", value: "family" },
                    { label: "Travel", value: "travel" },
                    { label: "Work", value: "work" },
                  ]}
                />
              </Column>

              <Column gap="12">
                <Heading variant="heading-strong-s">Tags</Heading>

                <Row gap="8" wrap>
                  <Tag label="Growth" />
                  <Tag label="Career" />
                  <Button
                    type="button"
                    size="s"
                    variant="secondary"
                    label="+ Add Tag"
                  />
                </Row>
              </Column>

              {error ? (
                <Text variant="body-default-s" onBackground="danger-weak">
                  {error}
                </Text>
              ) : null}

              <Row fillWidth horizontal="between" vertical="center">
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {content.trim().length > 0
                    ? `${content.trim().split(/\s+/).length} words`
                    : "0 words"}
                </Text>

                <Button
                  type="submit"
                  label={saving ? "Saving..." : isEditing ? "Update Letter" : "Seal Letter"}
                  size="m"
                  disabled={saving}
                />
              </Row>
            </Column>
          </Column>
        </form>
      </Column>
    </Column>
  );
}
