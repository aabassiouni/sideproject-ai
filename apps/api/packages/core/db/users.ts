import { users } from "@sideproject-ai/db";
import { eq, sql } from "drizzle-orm";
import { db } from "./db";

export async function decreaseUserCredits(userId: string) {
  await db.update(users).set({ credits: sql`credits - 1` }).where(eq(users.userID, userId));

  return;
}
