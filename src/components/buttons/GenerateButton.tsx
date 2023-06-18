'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import SparkleIcon from '../icons/SparkleIcon'
import { useValues } from '../context/context'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function GenerateButton() {
    const { selectedRepo, generation, setGeneration, keywords } = useValues()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleClick(event: any) {
        // event.preventDefault();
        setIsLoading(true)

        const response = await fetch(`/api/generate`, {
            // cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                repo: selectedRepo.repo,
                url: selectedRepo.url,
                owner: selectedRepo.owner,
                keywords: keywords,
            }),
        })

        const data = await response.json()

        if (data.error) {
            // toast({
            //     variant: 'destructive',
            //     title: 'No Credits!',
            //     description: 'You need to buy more credits to generate more bullets.',
            // })
        } else {
            setIsLoading(false)
            setGeneration(data.bullets)
        }

        router.refresh()
    }
    return (
        <Button
            size={'lg'}
            onClick={handleClick}
            className="flex w-40 flex-col bg-gradient-to-r from-cyan-500 to-blue-500"
        >
            {!isLoading ? (
                <>
                    <span className="leading-none">
                        Generate
                        <SparkleIcon className="ml-2 inline-block" />
                    </span>
                    <span className="text-xs leading-none">(1 credit)</span>
                </>
            ) : (
                <Loader2 className="h-6 w-6 animate-spin" />
            )}
        </Button>
    )
}

export default GenerateButton
