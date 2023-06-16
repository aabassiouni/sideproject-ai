import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { auth } from '@clerk/nextjs'

// export const runtime = 'edge';

export async function POST(request: NextRequest) {
    console.log('/////////////// creating checkout session ///////////////')
    const { userId } = auth()

    try {
        const origin = request.headers.get('origin')
        // const body = await request.body
        // console.log('body', body)
        const formData = await request.formData()
        const item = formData.get('item') as string
        // Create Checkout Sessions from body params.

        if (item !== null) {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: item,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                metadata: {
                    userId, 
                },
                success_url: `${origin}/dashboard`,
                cancel_url: `${origin}/dashboard`,
            })
            
            if (!session) {
                return NextResponse.json({ error: 'something happened' })
            }

            return NextResponse.redirect(session?.url ?? '/', 303)
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'something happened' })
    }
}
