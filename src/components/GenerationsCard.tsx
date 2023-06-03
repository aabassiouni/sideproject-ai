import React, { Suspense } from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'
import DeleteGenerationButton from './DeleteGenerationButton'
import AnimateSize from './AnimateSize'
import { currentUser } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'

export const dynamic = 'force-dynamic'

type Generation = {
    generation_id_uuid: string
    user_id: string
    repo_name: string
    created_on_date: string
    generated_text: string
}

function GenerationCard({ generation }: { generation: Generation }) {
    return (
        <Link href={`/dashboard/${generation.generation_id_uuid}`}>
            <Card className="flex w-fit sm:w-full items-center justify-around bg-slate-100 p-4 py-2">
                <div className="w-44 overflow-ellipsis">
                    <p className="line-clamp-1 text-ellipsis text-sm font-medium  tracking-tight sm:text-base">
                        {generation.repo_name.split('/')[1]}
                    </p>
                </div>
                <div className="line-clamp-1 w-fit text-sm text-slate-400">
                    <p>{generation.created_on_date}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    {/* <Button size={'sm'}>View</Button> */}
                    <DeleteGenerationButton generationID={generation.generation_id_uuid} />
                </div>
            </Card>
        </Link>
    )
}

async function GenerationsCard() {
    const user = await currentUser()
    const results = await conn.execute(
        'SELECT user_id, repo_name, created_on_date, generated_text, BIN_TO_UUID(generation_id) AS generation_id_uuid FROM generations Where user_id = ? ;',
        [user?.id]
    )
    let generations = results.rows

    return (
        <Card className="w-full sm:w-[650px] ">
            <CardHeader className="space-y-4 ">
                <CardTitle>Generations</CardTitle>
                <Separator />
                <CardContent className="flex flex-col gap-4 overflow-x-scroll px-0">
                    {generations?.length > 0 ? (
                        generations.map((generation: any) => <GenerationCard generation={generation} />)
                    ) : (
                        <p className="text-center text-slate-400">No generations yet!</p>
                    )}
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default GenerationsCard
