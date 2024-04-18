import { users } from "@sideproject-ai/db";
import { eq, sql } from "drizzle-orm";
import { db } from "./db";

export async function fetchUserCredits(userId: string) {
  const [{ credits }] = await db
    .select({
      credits: users.credits,
    })
    .from(users)
    .where(eq(users.userID, userId));

  return credits;
}

export async function decreaseUserCredits(userId: string) {
  await db.update(users).set({ credits: sql`credits - 1` }).where(eq(users.userID, userId));

  return;
}

export async function fetchUserRepos(userId: string) {
  const [{ repos }] = await db
    .select({
      repos: users.repos,
    })
    .from(users)
    .where(eq(users.userID, userId));

  return repos;
}

