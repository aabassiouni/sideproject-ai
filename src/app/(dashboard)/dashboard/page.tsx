import React, { Suspense } from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { currentUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import StartWritingButton from '@/components/buttons/StartWritingButton'
import Link from 'next/link'
import DeleteGenerationButton from '@/components/buttons/DeleteGenerationButton'
import { fetchAllGenerationsForUser } from '@/lib/db'
import type { Generation } from '@/lib/db'
import { redirect } from 'next/navigation'

export const revalidate = 0
export const runtime = 'edge'

function GenerationsCardLoading() {
    return (
        <Card className="mt-10 w-full sm:w-[650px]  ">
            <CardHeader className="space-y-4">
                <CardTitle>Generations</CardTitle>
                <Separator />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </CardHeader>
        </Card>
    )
}
function GenerationCard({ generation }: { generation: Generation }) {
    const date = new Date(generation.timestamp ?? Date.now())
    return (
        <Card className="flex w-full items-center justify-around bg-slate-100 p-4 py-2 dark:bg-gray-900 sm:w-full">
            <Link className="flex justify-between gap-2 " href={`/dashboard/${generation?.generation_id}`}>
                <div className="w-44 overflow-ellipsis">
                    <p className="line-clamp-1 text-ellipsis text-sm font-medium  tracking-tight sm:text-base">
                        {generation?.repo_name?.split('/')[1]}
                    </p>
                </div>
            </Link>
            <div className="line-clamp-1 w-fit text-sm text-slate-400">
                <p>{date.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-1.5">
                <DeleteGenerationButton generationID={generation.generation_id ?? '0'} />
            </div>
        </Card>
    )
}
async function DashboardPage() {
    const user = await currentUser()

    if (user?.privateMetadata?.isOnboarded === false) {
        redirect('/onboarding')
    }
    if (!user) {
        return
    }

    const generations = await fetchAllGenerationsForUser(user?.id)

    return (
        <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-200 p-4 pt-0 dark:bg-gray-900">
            <Suspense fallback={<GenerationsCardLoading />}>
                <Card className="mt-10 w-full dark:bg-gray-800 sm:w-[650px] ">
                    <CardHeader className="items-center justify-between sm:flex-row">
                        <CardTitle className="p-2 sm:p-0">Generations</CardTitle>
                        <Link href="/dashboard/write">
                            <StartWritingButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800 dark:text-white" />
                        </Link>
                    </CardHeader>
                    <Separator />
                    <CardContent className=" my-auto flex min-h-[50px] flex-col gap-2 overflow-x-scroll p-2">
                        {/* <div className="p-2 my-auto gap-4 overflow-x-scroll"> */}
                        {generations?.length > 0 ? (
                            generations.map((generation: any, index: number) => (
                                <GenerationCard key={index} generation={generation} />
                            ))
                        ) : (
                            <p className="text-center text-slate-400">No generations yet!</p>
                        )}
                        {/* </div> */}
                    </CardContent>
                    <CardFooter />
                </Card>
            </Suspense>
        </div>
    )
}

export default DashboardPage
