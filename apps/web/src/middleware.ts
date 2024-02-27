import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { notifyDiscord } from './lib/discord'

export default authMiddleware({
    publicRoutes: ['/opengraph-image', '/twitter-image', '/api/webhook/stripe', '/api/webhook/clerk', '/api/cron'],
    ignoredRoutes: ['/'],
    afterAuth: (auth, req) => {
        if (auth.userId) {
            notifyDiscord({
                type: 'user_logged_in',
                data: {
                    userId: auth.userId,
                },
            })
        }
        return NextResponse.next()
    },
})

export const config = {
    matcher: ['/dashboard', '/api/(.*)', '/onboarding', '/dashboard/(.*)'],
}
