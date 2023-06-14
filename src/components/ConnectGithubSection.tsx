'use client'

import React from 'react'
import { CardContent } from './ui/card'
import { useUser, useSignIn } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function ConnectGithubSection() {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()

    console.log("user in ConnectGithubSection", user)

    async function handleSignin() {
        await user
            ?.createExternalAccount({
                strategy: 'oauth_github',
                redirectUrl: 'https://localhost:3000/dashboard/profile',
                additionalScopes: ['repo'],
            })
            .then((res) => {
                // if(res.verification?.status === 'verified')
                console.log(res.verification?.externalVerificationRedirectURL?.toString())
                // router.push(res.verification?.externalVerificationRedirectURL?.toString())
            })
    }

    if (!isLoaded) {
        return (
            <CardContent className="my-4 flex flex-col items-center justify-center gap-4">
                {/* <CardTitle className="text-lg font-semibold">Github</CardTitle> */}
                <Skeleton className="h-10 w-full rounded-xl" />
            </CardContent>
        )
    }

    if (user?.verifiedExternalAccounts[0]?.provider === 'github') {
        return (
            <CardContent className="my-4 flex flex-col items-center justify-center gap-4">
                {/* <CardTitle className="text-lg font-semibold">Github</CardTitle> */}
                <p>You are connected to GitHub!</p>
            </CardContent>
        )
    }

    return (
        <CardContent className="my-4 flex flex-col items-center justify-center gap-4">
            {/* <CardTitle className="text-lg font-semibold">Github</CardTitle> */}
            <p>Connect Github Account</p>
            <Button onClick={handleSignin}>Connect Github</Button>
        </CardContent>
    )
}

export default ConnectGithubSection
