import Link from 'next/link'
import React, { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { currentUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { User, CreditCard, LogOut, ContactIcon } from 'lucide-react'
import { Button } from './ui/button'
import { SignOutButton } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'
import { fetchUserCredits } from '@/lib/db'

async function UserCredits() {
    const user = await currentUser()
    if (!user) return
    const credits = await fetchUserCredits(user?.id)

    return (
        <p className="font-necto text-muted-foreground ">
            {credits === 1 ? credits + ' credit' : credits + ' credits'}
        </p>
    )
}

async function UserButton() {
    const user = await currentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <div> */}
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
                        <Avatar>
                            <AvatarImage src={user?.imageUrl} />
                            {/* <AvatarFallback>
                                {user?.firstName && user.lastName ? user?.firstName[0] + user?.lastName[0] : ''}
                            </AvatarFallback> */}
                        </Avatar>
                    </Suspense>
                </Button>
                {/* </div> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-56" align="center" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={'/dashboard/profile'}>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/dashboard/purchase'}>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Buy Credits</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/dashboard/contact'}>
                        <DropdownMenuItem>
                            <ContactIcon className="mr-2 h-4 w-4" />
                            Contact
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <LogoutButton /> */}
                    <SignOutButton>
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </SignOutButton>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function DashboardNavbar() {
    return (
        <div className="px-2 py-4 shadow-md sm:p-4 ">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-lg sm:text-xl font-bold">
                    <Link className="font-necto" href="/dashboard" replace>
                        sideprojectAI
                    </Link>
                    <Badge className="ml-2 bg-slate-800">Beta</Badge>
                </div>
                {/* <p>https://github.com/aabassiouni/next-js-app-router-helper</p> */}
                <div className="flex items-center gap-4">
                    {/* <Suspense fallback={<Skeleton className="h-4 w-20" />}>
                        <UserCredits />
                    </Suspense> */}
                    {/* @ts-ignore */}
                    <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
                        <UserButton />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar
