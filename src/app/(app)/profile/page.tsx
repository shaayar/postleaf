import { getCurrentProfile, getLetterStats, listLetters } from "@/lib/queries";

import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const [profile, letters, stats] = await Promise.all([
    getCurrentProfile(),
    listLetters({ limit: 200 }),
    getLetterStats(),
  ]);

  const collections = Array.from(
    letters
      .map((letter) => letter.collection?.trim())
      .filter((value): value is string => Boolean(value))
      .reduce((acc, name) => {
        acc.set(name, (acc.get(name) ?? 0) + 1);
        return acc;
      }, new Map<string, number>()),
    ([name, count]) => ({ name, count }),
  ).sort((a, b) => b.count - a.count);

  return (
    <ProfileClient
      profile={profile}
      recentLetters={letters.slice(0, 3)}
      stats={stats}
      collections={collections}
    />
  );
}
