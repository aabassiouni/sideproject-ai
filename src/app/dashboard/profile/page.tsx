import { RedirectToSignIn, SignedIn, SignedOut, UserProfile, currentUser } from '@clerk/nextjs'
import React, { Suspense } from 'react'

export const runtime = "edge";

async function ProfilePage() {
    const user = await currentUser()

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
            <div className="dark:bg-gray-900 bg-slate-200 flex items-center p-4 justify-center">
                <SignedIn>
                    {/* Signed in users will see their user profile */}
                    <div className="leading-none">
                        <UserProfile  />
                        {/* <Card className="mt-10 w-full p-2 sm:w-[550px]">
                            <CardHeader className=" items-center justify-center gap-4 text-center">
                                <div className="grow">
                                    <Avatar className="mx-auto">
                                        <AvatarImage src={user?.profileImageUrl} />
                                        <AvatarFallback>
                                            {user?.firstName && user.lastName
                                                ? user?.firstName[0] + user?.lastName[0]
                                                : ''}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="text-lg font-semibold">
                                        {user?.firstName && user.lastName ? user?.firstName + ' ' + user?.lastName : ''}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.emailAddresses[0].emailAddress}
                                    </p>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="flex flex-col items-center justify-center gap-3">
                                <CardTitle className="text-lg font-semibold">Credits</CardTitle>
                                <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
                                    <p className="text-base leading-none">You have {3} credits</p>
                                    <Button>Buy Credits!</Button>
                                </div>
                            </CardContent>
                            <Separator />
                            <Suspense fallback={<div>Loading...</div>}>
                                <ConnectGithubSection />
                            </Suspense>
                            <CardFooter></CardFooter>
                        </Card> */}
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
