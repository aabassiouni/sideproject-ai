import { insertUser } from "@/lib/db";
import { notifyDiscord } from "@/lib/discord";
import { type WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const event = await verifyWebhook(request);

  switch (event.type) {
    case "user.created": {
      const clerk = await clerkClient();
      event.data.email_addresses[0].email_address;
      await clerk.users.updateUserMetadata(event.data.id, {
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
  }
  return NextResponse.json({ received: true });
}
