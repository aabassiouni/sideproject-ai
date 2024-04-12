"use server";

import { revalidatePath } from "next/cache";
import { deleteGeneration } from "./db";

export async function deleteGenerationAction(generationID: string) {
  await deleteGeneration(generationID);
  revalidatePath("/dashboard");
}
