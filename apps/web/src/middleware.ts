import { authMiddleware, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { fetchUser, insertUser } from "./lib/db";
import { notifyDiscord } from "./lib/discord";

export default authMiddleware({
  publicRoutes: ["/opengraph-image", "/twitter-image", "/api/webhook/stripe", "/api/webhook/clerk", "/api/cron"],
  ignoredRoutes: ["/"],
  afterAuth: async (auth) => {
    if (auth.userId) {
      const userFromDB = await fetchUser(auth.userId);

      if (!userFromDB) {
        console.log(`User ${auth.userId} not found in the database`);
        insertUser(auth.userId, "", 3);
        await clerkClient.users.updateUserMetadata(auth.userId, {
          privateMetadata: {
            isOnboarded: false,
          },
        });
      }

      notifyDiscord({
        type: "user_logged_in",
        data: {
          userId: auth.userId,
        },
      });
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/dashboard", "/api/(.*)", "/onboarding", "/dashboard/(.*)"],
};
