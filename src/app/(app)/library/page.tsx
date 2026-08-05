import { listLetters } from "@/lib/queries";

import LibraryClient from "./LibraryClient";

export default async function LibraryPage() {
  const letters = await listLetters({ limit: 200 });

  return <LibraryClient letters={letters} />;
}
