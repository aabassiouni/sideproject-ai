import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { db } from './db'
import { generations } from '@sideproject-ai/db'
import { auth } from '@clerk/nextjs'
export async function insertGeneration(
    generation_id: string,
    userID: string,
    owner: string,
    repo: string,
    res: any,
    bullets: string[]
) {
    const generation = await db.insert(generations).values({
        generationID: generation_id,
        userID: userID,
        repoName: `${owner}/${repo}`,
        generatedText: res?.text,
        bullets: JSON.stringify(bullets),
    })

    return generation
}

export async function fetchAllGenerationsForUser(userId: string) {
  const generationsResult = await db
    .select({
      userID: generations.userID,
      repoName: generations.repoName,
      generatedText: generations.generatedText,
      timestamp: generations.timestamp,
      generationID: generations.generationID,
    })
    .from(generations)
    .where(and(eq(generations.userID, userId), eq(generations.deleted, 0)))
    .orderBy(desc(generations.timestamp));

  return generationsResult;
}

export async function fetchGenerationByID(generation_id: string) {
    const generation = await db.select().from(generations).where(eq(generations.generationID, generation_id))

    return generation[0]
}

export async function updateGenerationRating(generation_id: string, rating: number) {
    const generation = await db
        .update(generations)
        .set({ rating: rating })
        .where(eq(generations.generationID, generation_id))

    return
}

export async function deleteGeneration(generationId: string) {
  const { userId } = auth();
  if (!userId) return;

  await db
    .update(generations)
    .set({ deleted: 1 })
    .where(and(eq(generations.userID, userId), eq(generations.generationID, generationId)));

  return;
}
