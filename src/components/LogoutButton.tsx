'use client';

import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import React from 'react'
import { DropdownMenuShortcut } from './ui/dropdown-menu'
// import { useClerk } from "@clerk/clerk-react";

function LogoutButton() {
    // const { signOut } = useClerk();

    // function handleLogout() {
    //     signOut();  
    // }
    return (
        <div
            // variant="ghost"
            // onClick={handleLogout}
            className={cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                // 'pl-8'
            )}
        >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </div>
    )
}

export default LogoutButton
