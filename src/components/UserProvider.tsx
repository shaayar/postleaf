"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/sb/client";

type Profile = {
  avatar_url: string | null;
  username: string | null;
  bio: string | null;
};

type UserContextValue = {
  loading: boolean;
  error: string | null;
  profile: Profile | null;
  userEmail: string | null;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/profile", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as {
        profile: Profile;
        email?: string | null;
      };
      setProfile(data.profile ?? null);
      setUserEmail(data.email ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch user profile");
      setProfile(null);
      setUserEmail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // Listen for auth state changes to proactively refresh user/profile
    const supabase = createClient();
    const { data: sub } = supabase.auth.onAuthStateChange((_event) => {
      void load();
    });
    return () => {
      sub?.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ loading, error, profile, userEmail, refresh: load }),
    [loading, error, profile, userEmail],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
