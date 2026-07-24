"use client";

import { createClient } from "@/lib/sb/client";
import { Button, Column, PasswordInput, Row, Spinner, Text } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      router.push("/profile");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column fillWidth horizontal="center" padding="xl">
      <Column maxWidth="xs" fillWidth gap="l" padding="xl" radius="xl" border="neutral-alpha-weak">
        <Column gap="8">
          <Text variant="heading-default-l">Set a new password</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Choose a new password to complete your account recovery.
          </Text>
        </Column>

        {success ? (
          <Row>
            <Text variant="label-default-s">Password updated. Redirecting to your profile.</Text>
          </Row>
        ) : (
          <form onSubmit={handleSubmit}>
            <Column fillWidth gap="8">
              <PasswordInput
                id="password"
                placeholder="New password"
                required
                value={password}
                errorMessage={error}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordInput
                id="confirm-password"
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                errorMessage={error}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Row fillWidth paddingTop="16">
                <Button fillWidth type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Update password"}
                </Button>
              </Row>
            </Column>
          </form>
        )}
      </Column>
    </Column>
  );
}
