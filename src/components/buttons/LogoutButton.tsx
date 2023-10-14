'use client'

import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import React from 'react'
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


function LogoutButton() {
    const { signOut } = useClerk()
    const router = useRouter()

    function handleLogout() {
        signOut()
        router.push('/')
    }

    return (
        <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
    )
}

export default LogoutButton
