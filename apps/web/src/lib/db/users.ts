import { users } from "@sideproject-ai/db";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./db";

export async function insertUser(userId: string, email: string, credits: number) {
  const user = await db.insert(users).values({
    userID: userId,
    email: email,
    credits: credits,
  });

  return;
}

export async function decreaseUserCredits(userId: string) {
  const user = await db.update(users).set({ credits: sql`credits - 1` }).where(eq(users.userID, userId));

  return;
}

export async function increaseUserCredits(userId: string) {
  const user = await db.update(users).set({ credits: sql`credits + 3` }).where(eq(users.userID, userId));

  return;
}

export async function updateUserReferral(userId: string, referral: string) {
  const user = await db.update(users).set({ referral: referral }).where(eq(users.userID, userId));

  return;
}
export async function fetchUserCredits(userId: string) {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await delay(2000);
  for (let i = 0; i < 10; i++) {
    const credits = await db.select({ credits: users.credits }).from(users).where(eq(users.userID, userId));

    return credits[0].credits;
  }

  return 0;
}
