import { generations } from "@sideproject-ai/db";
import { db } from "./db";

export async function insertGeneration({
  generation_id,
  userID,
  owner,
  repo,
  text,
  bullets,
}: {
  generation_id: string;
  userID: string;
  owner: string;
  repo: string;
  text: string;
  bullets: string[];
}) {
  console.log("inserting generation");
  const generation = await db.insert(generations).values({
    generationID: generation_id,
    userID: userID,
    repoName: `${owner}/${repo}`,
    generatedText: text,
    bullets: JSON.stringify(bullets),
  });

  return generation;
}
