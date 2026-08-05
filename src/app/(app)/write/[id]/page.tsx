import { notFound } from "next/navigation";

import { getLetterById } from "@/lib/queries";

import LetterEditor from "../LetterEditor";

export default async function EditLetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || id === "undefined") {
    notFound();
  }

  const letter = await getLetterById(id);

  if (!letter) {
    notFound();
  }

  return <LetterEditor mode="edit" letter={letter} />;
}
