'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import SparkleIcon from '../icons/SparkleIcon'
import { useValues } from '../context/context'
import { Loader2 } from 'lucide-react'

function GenerateButton() {
    const { selectedRepo, generation, setGeneration, keywords } = useValues()
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(event: any) {
        // event.preventDefault();
        console.log('Generating')
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
        const { bullets } = await response.json()
        console.log(bullets)
        setIsLoading(false)
        setGeneration(bullets)
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
