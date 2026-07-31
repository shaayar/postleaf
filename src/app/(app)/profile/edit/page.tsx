"use client";

import { Column, Row, Text, Button, Input, Textarea, Spinner, Dialog } from "@once-ui-system/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";

export default function EditProfilePage() {
  const { profile, refreshUser } = useUser();
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
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          username: username.trim(),
          bio: bio.trim(),
        },
      });

      if (error) throw error;

      await refreshUser();
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
    <Column fill fillHeight padding="32" gap="24" maxWidth="600" horizontal="center">
      <Text variant="heading-strong-l">Edit Profile</Text>

      <Column gap="24" background="surface" border="neutral-alpha-weak" padding="24" radius="l">
        <form onSubmit={handleSave}>
          <Column gap="16">
            <Column gap="8">
              <Text variant="label-default-m">Username</Text>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                maxLength={30}
                disabled={saving}
              />
            </Column>

            <Column gap="8">
              <Text variant="label-default-m">Bio</Text>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                maxLength={160}
                lines={4}
                disabled={saving}
              />
              <Text variant="label-default-s" color="neutral-muted">
                {bio.length}/160
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