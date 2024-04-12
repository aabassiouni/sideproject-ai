import { insertUser } from "@/lib/db";
import { notifyDiscord } from "@/lib/discord";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const event = (await request.json()) as WebhookEvent;
  // console.log(event)
  switch (event.type) {
    case "user.created":
      event.data.email_addresses[0].email_address;
      await clerkClient.users.updateUserMetadata(event.data.id, {
        privateMetadata: {
          isOnboarded: false,
        },
      });
      await insertUser(event.data.id, 3);
      await notifyDiscord({
        type: "user_created",
        data: {
          email: event.data.email_addresses[0].email_address,
        },
      });
      console.log(`User ${event.data.id} was created!`);
      break;
  }
  return NextResponse.json({ received: true });
}
