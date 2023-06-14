import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { conn } from '@/lib/planetscale'
// import { auth, currentUser } from '@clerk/nextjs'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    console.log('/////////////// receiving webhook ///////////////')
    // let event = await request.body;
    const event = await request.json()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')
    // console.log(signature)

    // if (signature === null) {
    //     return NextResponse.json({ error: 'something happened' })
    // }
    // if (event.data.object.metadata.userId === undefined) {
    //     return NextResponse.json({ error: 'something happened' })
    // }

    switch (event.type) {
        case 'payment_intent.succeeded':

            const { rows } = await conn.execute(
                `UPDATE users SET credits = credits + 1 WHERE clerk_user_id = '?';`,[event.data.object.metadata.userId]
            )

            const paymentIntent = event.data.object
            console.log(paymentIntent)
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break


        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`)
    }

    return NextResponse.json({ received: true })
}
