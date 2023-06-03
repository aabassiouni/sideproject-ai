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
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, CreditCard, Settings, PlusCircle, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import LogoutButton from './LogoutButton'
function UserButtonLoading() {
    return (
        <div>
            <Skeleton className="h-10 w-10 rounded-full" />
        </div>
    )
}

async function UserButton() {
    const user = await currentUser()
    // console.log(user)
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
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function DashboardNavbar() {
    return (
        <div className="p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl font-bold">
                    <Link href="/dashboard" replace>Sideproject.ai</Link>
                </div>
                {/* <p>https://github.com/aabassiouni/next-js-app-router-helper</p> */}
                {/* @ts-ignore */}
                <UserButton />
            </div>
        </div>
    )
}

export default DashboardNavbar
