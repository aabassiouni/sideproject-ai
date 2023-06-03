'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { GithubIcon, ArrowRightIcon, ArrowLeftCircleIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import SubmitLinkButton from './SubmitLinkButton'
import Link from 'next/link'

function RepoCard() {
    return (
        <div className="flex items-center rounded-xl border p-2">
            <div className="grow">
                <p className="text-sm font-medium leading-7 tracking-tight [&:not(:first-child)]:mt-6 ">
                    <GithubIcon className="mr-2 inline-block" size={16} />
                    aabassiouni/repo-1
                </p>
            </div>
            <Button size="sm" className="">
                <ArrowRightIcon size={16} />
            </Button>
        </div>
    )
}
function GithubRepoCard({ children }: { children: React.ReactNode }) {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setIsSubmitted(true)
    }

    

    return (
        <div className="sm:max-h-screen hidden sm:flex flex-col items-center max-w-sm overflow-x-hidden rounded-xl sm:rounded-none sm:rounded-tr-xl bg-white px-6 py-3">
            <Link className='self-start' href={"/dashboard"}>
                <Button variant={'link'} size={'sm'} className="">
                    <ArrowLeftCircleIcon size={16} />
                </Button>
            </Link>
            <CardHeader className="pt-2">
                <CardTitle>Choose a repo!</CardTitle>
                <CardDescription>
                    Choose a repo from your Github account to import into sideproject.ai or input a github a link
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-2">
                <SubmitLinkButton />
            </CardContent>
            <Separator className='mx-0 my-3 mt-2'/>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    )
}

export default GithubRepoCard
