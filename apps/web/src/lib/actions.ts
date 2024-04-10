"use server";

import { revalidatePath } from "next/cache";
import { deleteGeneration } from "./db";

export async function deleteGenerationAction(generationID: string) {
  console.log("deleting generation with id:", generationID);
  await deleteGeneration(generationID);
  revalidatePath("/dashboard");
}
