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

    const variants = {
        hidden: { x: '0%' },
        show: { x: '-100%' },
    }

    return (
        <div className="max-h-screen max-w-sm overflow-x-hidden rounded-tr-xl bg-white px-6 py-3">
            <Link href={"/dashboard"}>
                <Button size={'sm'} className="">
                    <ArrowLeftCircleIcon size={16} />
                </Button>
            </Link>
            <CardHeader className="pt-2">
                <CardTitle>Choose a repo!</CardTitle>
                <CardDescription>
                    Choose a repo from your Github account to import into sideproject.ai or input a github a link
                </CardDescription>
            </CardHeader>
            <div className="space-y-2">
                <SubmitLinkButton />
                <Separator />
                {children}
            </div>
        </div>
        // <Card className="max-w-sm max-h-screen overflow-x-hidden">
        // 	{/* <motion.div
        // 		variants={variants}
        // 		initial="hidden"
        // 		animate={isSubmitted ? "show" : "hidden"}
        // 		transition={{ duration: 1 }}> */}
        // 	<CardHeader>
        // 		<CardTitle>Choose a repo!</CardTitle>
        // 		<CardDescription>
        // 			Choose a repo from your Github account to import into sideproject.ai
        // 			or input a github a link
        // 		</CardDescription>
        // 	</CardHeader>
        // 	<CardContent className="space-y-2">
        // 		<Input placeholder="Github Link" className="w-full" />
        // 		<Button onClick={handleSubmit} className="w-full">
        // 			Submit
        // 		</Button>
        // 		<Separator />
        // 		{children}
        // 	</CardContent>
        // 	{/* </motion.div> */}
        // </Card>
    )
}

export default GithubRepoCard
