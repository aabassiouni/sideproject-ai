import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { increaseUserCredits } from '@/lib/db'


export async function POST(request: Request) {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('Stripe-Signature') as string
    let event

    if (signature === null) {
        return NextResponse.json({ error: 'no signature' }, { status: 400 })
    }
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string)
    } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return NextResponse.json({ error: 'signature failed' }, { status: 400 })
    }

    switch (event?.type) {
        case 'checkout.session.completed':
            console.log('/////////////// receiving webhook ///////////////')
            console.log('## checkout.session.completed ##')

            const line_items = (await stripe.checkout.sessions.listLineItems(
                //@ts-ignores
                event.data.object.id
            )) as Stripe.ApiList<Stripe.LineItem>
            console.log(line_items.data[0].price?.product)

            // if (line_items.data[0].price?.product === process.env.THREE_CREDITS) {
            console.log('## Adding 3 Credits ##')
            //@ts-ignore
            await increaseUserCredits(event.data.object.metadata?.userId)
            //@ts-ignore
            console.log(`User ${event.data.object.metadata?.userId} was updated!`)
            // }
            break
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event?.type}.`)
    }

    return NextResponse.json({ received: true })
}
