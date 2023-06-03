import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RedirectToSignIn, SignedIn, SignedOut, UserProfile, currentUser } from '@clerk/nextjs'
import React from 'react'

async function ProfilePage() {
    // const user = await currentUser()

    return (
        // <div className="flex flex-1 items-center justify-center">
        //     <Card className="mt-10 p-2 w-full sm:w-[550px]">
        //         <CardHeader className=" items-center justify-center gap-4 text-center">
        //             <div className="grow">
        //                 <Avatar className="mx-auto">
        //                     <AvatarImage src={user?.profileImageUrl} />
        //                     <AvatarFallback>
        //                         {user?.firstName && user.lastName ? user?.firstName[0] + user?.lastName[0] : ''}
        //                     </AvatarFallback>
        //                 </Avatar>
        //                 <p className="text-lg font-semibold">
        //                     {user?.firstName && user.lastName ? user?.firstName + ' ' + user?.lastName : ''}
        //                 </p>
        //                 {/* <p className="text-xs leading-none text-muted-foreground">{user?.createdAt}</p>
        //                 <p className="text-xs leading-none text-muted-foreground">{user?.id}</p> */}
        //             </div>
        //         </CardHeader>
        //         <Separator />
        //         <CardFooter className="flex flex-col items-center justify-center gap-4">
        //             <p className="text-lg font-semibold">Credits</p>
        //             <p className="text-xs leading-none text-muted-foreground">You have 0 credits</p>
        //         </CardFooter>
        //     </Card>
        // </div>
        <>
            <div className="flex items-center justify-center">
                <SignedIn>
                    {/* Signed in users will see their user profile */}
                    <div className="leading-none">
                        <UserProfile />
                    </div>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </div>
        </>
    )
}

export default ProfilePage
