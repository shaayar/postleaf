"use server";

import { createLetter, updateLetter } from "@/lib/actions";

export async function createLetterAction(input: unknown) {
  return createLetter(input);
}

export async function updateLetterAction(input: unknown) {
  return updateLetter(input);
}
