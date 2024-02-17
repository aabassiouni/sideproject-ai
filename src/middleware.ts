import { authMiddleware, currentUser, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
    publicRoutes: [ '/opengraph-image', '/twitter-image', '/api/webhook/stripe', '/api/webhook/clerk', '/api/cron'],
    ignoredRoutes: ['/'],
    // afterAuth: (auth, req) => {
    //     // Add custom logic here
    //     const user = currentUser()
    //     if (!auth.userId) {
    //       console.log("redirecting to signin");
    //       return redirectToSignIn({ returnBackUrl: req.url });
    //     }
    //     console.log("private metadata", auth);
    //     if (auth.user?.publicMetadata.isOnboarded === false) {
    //         return NextResponse.redirect('/onboarding')
    //     }
    // },
})

export const config = {
    matcher: ['/dashboard', '/api/(.*)', '/onboarding', '/dashboard/(.*)'],
}
