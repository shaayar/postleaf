"use client";

import { Button, Column, Input, Row, Spinner, Text, Textarea } from "@once-ui-system/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserProvider";
import { profileValidation } from "@/resources/validation";

export default function EditProfilePage() {
  const { profile, refresh } = useUser();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          bio: bio.trim(),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${response.status})`);
      }

      await refresh();
      router.push("/profile");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <Column fill fillHeight horizontal="center" vertical="center" gap="16">
        <Spinner size="l" />
        <Text variant="body-default-m">Loading...</Text>
      </Column>
    );
  }

  return (
    <Column fill fillHeight padding="32" gap="24" maxWidth={600} horizontal="center">
      <Text variant="heading-strong-l">Edit Profile</Text>

      <Column gap="24" background="surface" border="neutral-alpha-weak" padding="24" radius="l">
        <form onSubmit={handleSave}>
          <Column gap="16">
            <Column gap="8">
              <Text variant="label-default-m">Username</Text>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                maxLength={profileValidation.username.max_length}
                disabled={saving}
              />
            </Column>

            <Column gap="8">
              <Text variant="label-default-m">Bio</Text>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                maxLength={profileValidation.bio.max_length}
                lines={4}
                disabled={saving}
              />
              <Text variant="label-default-s" color="neutral-muted">
                {bio.length}/{profileValidation.bio.max_length}
              </Text>
            </Column>

            {error && (
              <Text variant="body-default-m" color="danger">
                {error}
              </Text>
            )}

            <Row horizontal="end" gap="12" paddingTop="8">
              <Button
                type="button"
                variant="secondary"
                label="Cancel"
                onClick={() => router.back()}
                disabled={saving}
              />
              <Button
                type="submit"
                label={saving ? "Saving..." : "Save Changes"}
                disabled={saving}
              >
                {saving && <Spinner size="s" />}
              </Button>
            </Row>
          </Column>
        </form>
      </Column>
    </Column>
  );
}
