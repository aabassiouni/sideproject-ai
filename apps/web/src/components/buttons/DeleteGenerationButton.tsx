'use client'

import React, { startTransition, useEffect, useState } from 'react'
import { Button } from '../ui/button'
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
import { Trash2 } from 'lucide-react'

function DeleteGenerationButton({ className, generationID }: { className?: string; generationID: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isEditing, setIsEditing] = useState(false)

    const [isOpen, setIsOpen] = useState(false)

    async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setIsEditing(true)
        try {
            const res = await fetch('/api/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    generationID: generationID,
                }),
            })
            const data = await res.json()

            setIsEditing(false)
        } catch (e) {
        }
        setIsOpen(false)
        startTransition(() => {
            if (pathname === '/dashboard') {
                router.refresh()
            } else {
                router.refresh()
                router.replace('/dashboard')
            }

        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={
            (e) => {
                setIsOpen(!isOpen)
            }
        }>
            <AlertDialogTrigger asChild>
                <Button
                    // onClick={(e) => {
                    //     // e.preventDefault()
                    //     e.stopPropagation()
                    // }}
                    type="button"
                    size={'sm'}
                    className={cn(className)}
                    disabled={isEditing}
                    variant={'destructive'}
                >
                    {isEditing ? 'Deleting' : <Trash2 size={16} />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently delete the generation!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClick}
                        className='bg-red-600 text-slate-50 hover:bg-red-600/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90'
                        // className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isEditing ? 'Deleting' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteGenerationButton