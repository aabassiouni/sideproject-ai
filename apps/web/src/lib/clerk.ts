import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkClient() {
  const clerk = await clerkClient();
  return clerk;
}
