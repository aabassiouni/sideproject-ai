'use client'

import React, { startTransition, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter, usePathname } from 'next/navigation'

function DeleteGenerationButton({ className, generationID }: { className?: string; generationID: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isEditing, setIsEditing] = useState(false)

    async function handleClick() {
        setIsEditing(true)
        try {
            const res = await fetch('/api/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    generation: generationID,
                }),
            })
            const data = await res.json()
            console.log(data)

            setIsEditing(false)
            startTransition(() => {
                if (pathname === '/dashboard') {
                    router.refresh()
                } else {
                    router.replace('/dashboard')
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={cn(className)} disabled={isEditing} variant={'destructive'}>
                    {isEditing ? 'Deleting' : 'Delete'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently delete the generation!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClick}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteGenerationButton
