// 'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Github, ArrowRight, ArrowLeftCircle } from 'lucide-react'
import SubmitLinkButton from './buttons/SubmitLinkButton'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
// import FileTree from './FileTree'

function GithubRepoCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden max-w-sm flex-col items-center overflow-x-hidden rounded-xl bg-white px-6 py-3 sm:flex sm:max-h-screen sm:min-w-[400px] sm:rounded-none sm:rounded-tr-xl">
            <Link className="self-start" href={'/dashboard'}>
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
            <Tabs defaultValue='repo' className='w-full'>
                <TabsList className='grid w-full grid-cols-2' >
                    <TabsTrigger value="link">Link</TabsTrigger>
                    <TabsTrigger value="repo">Repo</TabsTrigger>
                </TabsList>
                <TabsContent value="link">
                    {/* <CardContent className="w-full space-y-2"> */}
                    <div className='space-y-2'>
                        <SubmitLinkButton />
                    </div>
                    {/* </CardContent> */}
                </TabsContent>
                <TabsContent value="repo">
                    {/* <CardContent className="w-full space-y-2"> */}
                        {/* <SubmitLinkButton /> */}
                    {/* </CardContent> */}
                    {children}
                </TabsContent>

            </Tabs>
            {/* <CardContent className="w-full space-y-2">
                <SubmitLinkButton />
            </CardContent> */}
            <Separator className="mx-0 my-3 mt-2" />
            {/* <FileTree /> */}
            {/* <div className="space-y-2">{children}</div> */}
        </div>
    )
}

export default GithubRepoCard
