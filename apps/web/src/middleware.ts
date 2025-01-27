import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { fetchUser, insertUser } from "./lib/db";
import { notifyDiscord } from "./lib/discord";

export default clerkMiddleware(async (auth, _req) => {
  const { userId } = await auth();
  const clerk = await clerkClient();
  if (userId) {
    const userFromDB = await fetchUser(userId);

    if (!userFromDB) {
      console.log(`User ${userId} not found in the database`);
      insertUser(userId, 2);
      await clerk.users.updateUserMetadata(userId, {
        privateMetadata: {
          isOnboarded: false,
        },
      });
    }

    notifyDiscord({
      type: "user_logged_in",
      data: {
        userId: userId,
      },
    });
  }
});

export const config = {
  matcher: ["/dashboard", "/api/(.*)", "/onboarding", "/dashboard/(.*)"],
};
