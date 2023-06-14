// 'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Github, ArrowRight, ArrowLeftCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import SubmitLinkButton from './buttons/SubmitLinkButton'
import Link from 'next/link'

function GithubRepoCard({ children }: { children: React.ReactNode }) {

    return (
        <div className="sm:max-h-screen sm:min-w-[400px] hidden sm:flex flex-col items-center max-w-sm overflow-x-hidden rounded-xl sm:rounded-none sm:rounded-tr-xl bg-white px-6 py-3">
            <Link className='self-start' href={"/dashboard"}>
                <Button variant={'link'} size={'sm'} className="">
                    <ArrowLeftCircle size={16} />
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
