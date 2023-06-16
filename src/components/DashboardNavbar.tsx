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
import { User, CreditCard, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { SignOutButton } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'

async function UserButton() {
    const user = await currentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <div> */}
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
                        <Avatar>
                            <AvatarImage src={user?.profileImageUrl} />
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

async function DashboardNavbar() {
    const user = await currentUser()

    const { rows } = (await conn.execute('SELECT credits FROM users Where clerk_user_id = ? ;', [user?.id])) as {
        rows: { credits?: number }[]
    }
    return (
        <div className="p-4 shadow-md ">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl font-bold">
                    <Link className="font-necto" href="/dashboard" replace>
                        sideproject.ai
                    </Link>
                </div>
                {/* <p>https://github.com/aabassiouni/next-js-app-router-helper</p> */}
                <div className="flex items-center gap-4">
                    <p className="font-necto text-muted-foreground ">
                        {rows[0]?.credits === 1 ? rows[0]?.credits + ' credit' : rows[0]?.credits + ' credits'}
                    </p>
                    {/* @ts-ignore */}
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar
