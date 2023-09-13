import { NextRequest, NextResponse } from 'next/server'
import { conn } from '@/lib/planetscale'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { insertUser } from '@/lib/db'

export async function POST(request: NextRequest) {
    const event = (await request.json()) as WebhookEvent
    // console.log(event)
    switch (event.type) {
        case 'user.created':
            await insertUser(event.data.id, event.data.email_addresses[0].email_address, 3)

            console.log(`User ${event.data.id} was created!`)
            break

    }
    return NextResponse.json({ received: true })
}
