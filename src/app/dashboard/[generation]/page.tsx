import React, { Suspense } from 'react'
import { conn } from '@/lib/planetscale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GithubIcon from '@/components/icons/GithubIcon'
import DeleteGenerationButton from '@/components/buttons/DeleteGenerationButton'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import CopyToClipboardButton from '@/components/buttons/CopyToClipboardButton'
import { fetchGeneration } from '@/lib/db'

export const revalidate = 0
export const runtime = 'edge'

type Generation = {
    generation_id?: string
    user_id?: string
    repo_name?: string
    created_on_date?: string
    generated_text?: string
    bullets?: string
}
function Loading() {
    return <p>Loading...</p>
}
async function GenerationPage({ params }: { params: { generation: string } }) {
    const generation = await fetchGeneration(params.generation)
    console.log('generation', generation)
    const bullets = JSON.parse(generation.bullets ?? '[]')

    return (
        <div className="flex flex-col items-center justify-center gap-2 pb-4 px-4">
            <div className="mt-10 flex flex-col items-center sm:flex-row">
                <Link className="hidden sm:block" href={'/dashboard'}>
                    <Button variant={'ghost'} className="m-4  rounded-xl">
                        <ArrowLeftCircle size={24} />
                    </Button>
                </Link>
                <Card className="flex h-24  w-full flex-col p-2 sm:w-[550px]">
                    <p className="self-end p-1 text-sm leading-none text-muted-foreground">
                        {generation?.created_on_date}
                    </p>
                    <CardContent className="flex h-full items-center gap-4 self-center">
                        <Suspense fallback={<Loading />}>
                            <p className="inline-flex items-center justify-center text-base font-semibold sm:text-lg">
                                <GithubIcon className="mr-2 inline-block" />
                                {generation?.repo_name}
                            </p>
                            {/* <p className="text-sm leading-none text-muted-foreground">{rows[0]?.created_on_date}</p> */}
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
            <Card className="relative mt-2 sm:w-[850px]">
                <CardHeader>
                    <CardTitle>Generated Text</CardTitle>
                </CardHeader>
                <div className="flex h-full grow items-center justify-center">
                    <CardContent className="">
                        <DeleteGenerationButton
                            generationID={params.generation}
                            className="absolute right-0 top-0 m-4 "
                        />
                        <div className=" h-full w-full space-y-2 rounded-md  bg-slate-100 p-2 text-lg  sm:p-10">
                            <p className=" my-1 font-bold">{bullets[0]}</p>
                            <Separator className="" />
                            {bullets.slice(1).map((bullet: any, i: number) => (
                                <div key={i} className="w-full">
                                    <Card>
                                        <CardHeader className="flex-row items-center justify-between">
                                            <ul className="my-2 ml-6 list-disc [&>li]:mt-2 ">
                                                <li className="list-disc">{bullet}</li>
                                            </ul>
                                            <CopyToClipboardButton textToCopy={bullet} />
                                            {/* <Copy className="m-3 w-7 h-7 bg-slate-500 text-slate-400" /> */}
                                        </CardHeader>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default GenerationPage
