"use server";

import {
  createLetter,
  deleteLetter,
  publishLetter,
  updateLetter,
  updateLetterStatus,
} from "@/lib/actions";

export async function createLetterAction(input: unknown) {
  return createLetter(input);
}

export async function updateLetterAction(input: unknown) {
  return updateLetter(input);
}

export async function updateLetterStatusAction(input: unknown) {
  return updateLetterStatus(input);
}

export async function deleteLetterAction(id: string) {
  return deleteLetter(id);
}

export async function publishLetterAction(letterId: string) {
  return publishLetter(letterId);
}
