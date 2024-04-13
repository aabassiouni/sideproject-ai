import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("/////////////// creating checkout session ///////////////");
  const { userId } = auth();

  try {
    const origin = request.headers.get("origin");
    const formData = await request.formData();
    const item = formData.get("item") as string;

    if (item !== null) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: item,
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          userId,
          pid: item,
        },
        success_url: `${origin}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/dashboard`,
      });

      if (!session) {
        return NextResponse.json({ error: "something happened" });
      }

      return NextResponse.redirect(session?.url ?? "/", 303);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "something happened" });
  }
}
