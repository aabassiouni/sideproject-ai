import { increaseUserCredits } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("Stripe-Signature") as string;
  let event: Stripe.Event;

  if (signature === null) {
    return NextResponse.json({ error: "no signature" }, { status: 400 });
  }
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.log("⚠️  Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "signature failed" }, { status: 400 });
  }

  switch (event?.type) {
    case "checkout.session.completed": {
      console.log("/////////////// receiving webhook ///////////////");
      console.log("## checkout.session.completed ##");

      const eventObject = event.data.object as Stripe.Checkout.Session;
      const metadata = eventObject.metadata;

      if (metadata?.pid === process.env.THREE_CREDITS) {
        console.log("## Adding 3 Credits ##");
        await increaseUserCredits({ userId: metadata?.userId!, credits: 3 });
      } else if (metadata?.pid === process.env.ONE_CREDIT) {
        console.log("## Adding 1 Credit ##");
        await increaseUserCredits({ userId: metadata?.userId!, credits: 1 });
      }
      break;
    }
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event?.type}.`);
  }

  return NextResponse.json({ received: true });
}
