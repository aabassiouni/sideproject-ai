import React from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'
import DeleteGenerationButton from './DeleteGenerationButton'
import AnimateSize from './AnimateSize'

function GenerationCard({ generation }: { generation: any }) {
    return (
        <Card className="flex w-full items-center justify-around p-4 py-2">
            <div className="w-44 overflow-ellipsis">
                <p className="text-center text-base font-medium">{generation.repo_name}</p>
            </div>
            <div className="text-end">
                <p>{generation.created_on_date}</p>
            </div>
            <div className="flex gap-1.5">
                <Link href={`/dashboard/${generation.generation_id_uuid}`}>
                    <Button>View</Button>
                </Link>
                <DeleteGenerationButton generationID={generation.generation_id_uuid} />
            </div>
        </Card>
    )
}

function GenerationsCard({ generations }: { generations: any }) {
    return (
        <Card className="w-full sm:w-[650px] ">
            <CardHeader className="space-y-4">
                <CardTitle>Generations</CardTitle>
                <Separator />
                {generations?.length > 0 ? (
                    generations.map((generation: any) => <GenerationCard generation={generation} />)
                ) : (
                    <p className="text-center text-slate-400">No generations yet!</p>
                )}
            </CardHeader>
        </Card>
    )
}

export default GenerationsCard
