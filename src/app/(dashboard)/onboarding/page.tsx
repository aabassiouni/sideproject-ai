import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import OnboardingSubmitButton from '@/components/buttons/OnboardingSubmitButton'
import { Instagram } from 'lucide-react'
import XIcon from '@/components/icons/XIcon'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import UserIcon from '@/components/icons/UserIcon'
import { Button } from '@/components/ui/button'

import { currentUser } from '@clerk/nextjs'

import { updateUserReferral } from '@/lib/db'

async function OnboardingPage() {
    const user = await currentUser()

    if (user?.privateMetadata?.isOnboarded === true) {
        redirect('/dashboard')
    }

    async function handleSubmit(formData: FormData) {
        'use server'

        let referralValue = formData.get('referral') as string

        if (!formData.get('referral')) {
            referralValue = 'none'
        }

        console.log('the form data is', referralValue)

        const data = await fetch(`https://api.clerk.com/v1/users/${user?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
            body: JSON.stringify({
                private_metadata: {
                    isOnboarded: true,
                },
            }),
            cache: 'no-store',
        }).then((res) => res.json())

        await updateUserReferral(user?.id!, referralValue)

        revalidatePath('/dashboard')
        redirect('/dashboard')
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-gray-900">
            <h1 className="font-necto text-2xl font-bold">sideprojectAI</h1>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle className="text-center text-xl">How did you find out about us?</CardTitle>
                    <CardDescription className="text-center">
                        This helps us know if our marketing is working :)
                    </CardDescription>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent>
                        <Select name="referral" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="x">
                                    <div className="inline-flex items-center justify-center">
                                        <XIcon size={14} className="mr-2 text-black dark:text-white" />
                                        <span>X/Twitter</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="ig">
                                    <div className="inline-flex items-center justify-center">
                                        <Instagram size={14} className="mr-2" />
                                        <span>Instagram</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="linkedin">
                                    <div className="inline-flex items-center justify-center">
                                        <LinkedInIcon size={14} className="mr-2" />
                                        <span>LinkedIn</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="ref">
                                    <div className="inline-flex items-center justify-center">
                                        <UserIcon size={14} className="mr-2" />
                                        <span>Referral</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button formNoValidate type="submit" variant="ghost">
                            Skip
                        </Button>
                        <OnboardingSubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default OnboardingPage
