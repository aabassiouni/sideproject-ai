import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { conn } from '@/lib/planetscale'
import { stripe } from '@/lib/stripe'

// import { auth, currentUser } from '@clerk/nextjs'

// export const runtime = 'edge'


export async function POST(request: NextRequest) {
    const body = await request.text()
    // const event = await request.json()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')
    // console.log("SIGNATURE IS",signature)
    let event
    
    if (signature === null) {
        return NextResponse.json({ error: 'no signature' })
    }
    
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET ?? ''
        ) as any
        console.log("EVENT IS",event.type)
    } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return NextResponse.json({ error: 'signature failed' })
    }
    
    switch (event?.type) {
        case 'checkout.session.completed':
            console.log('/////////////// receiving webhook ///////////////')
            console.log('## checkout.session.completed ##')

            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id)
            console.log(line_items.data[0].price?.product)

            // if (line_items.data[0].price?.product === process.env.THREE_CREDITS) {
                console.log('## Adding 3 Credits ##')
                const { rows } = await conn.execute(`UPDATE users SET credits = credits + 3 WHERE clerk_user_id = ?;`, [
                    event.data.object.metadata?.userId,
                ])
                console.log(`User ${event.data.object.metadata?.userId} was updated!`)
            // }
            break
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event?.type}.`)
    }

    return NextResponse.json({ received: true })
}
