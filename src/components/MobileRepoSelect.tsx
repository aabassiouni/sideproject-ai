// 'use client';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import {Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import SubmitLinkButton from './buttons/SubmitLinkButton'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import GithubIcon from './icons/GithubIcon'

function MobileRepoSelect({ children }: { children: React.ReactNode }) {
    return (
        <Card className="min-h-44 m-4 my-2 flex h-fit flex-col items-center py-3 sm:hidden">
            <Tabs defaultValue="select" className="flex flex-col items-center">
                <TabsList className="mx-auto">
                    <TabsTrigger className="" value="input">
                        <LinkIcon className=" " size={16} />
                    </TabsTrigger>
                    <TabsTrigger value="select">
                        <GithubIcon />
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="input">
                    <CardHeader className="pt-2">
                        <CardTitle>Choose a repo!</CardTitle>
                        <CardDescription>
                            Choose a repo from your Github account to import into sideproject.ai or input a github a
                            link
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <SubmitLinkButton />
                    </CardContent>
                </TabsContent>
                <TabsContent value="select" className="">
                    <CardContent className="space-y-2">{children}</CardContent>
                </TabsContent>
            </Tabs>
        </Card>
    )
}

export default MobileRepoSelect
