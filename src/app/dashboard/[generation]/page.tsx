import React, { Suspense } from 'react'
import { conn } from '@/lib/planetscale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GithubIcon from '@/components/icons/GithubIcon'
import DeleteGenerationButton from '@/components/DeleteGenerationButton'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircleIcon } from 'lucide-react'
import Link from 'next/link'
export const revalidate = 0

type Generation = {
    generation_id?: string
    user_id?: string
    repo_name?: string
    created_on_date?: string
    generated_text?: string
}
function Loading() {
    return <p>Loading...</p>
}
async function GenerationPage({ params }: { params: { generation: string } }) {
    const { rows } = (await conn.execute('SELECT * FROM generations WHERE generation_id = UUID_TO_BIN(?)', [
        params.generation,
    ])) as { rows: Generation[] }

    return (
        <div className="flex h-full  flex-col items-center justify-center gap-2 px-4">
            <div className="mt-10 flex flex-col items-center sm:flex-row">
                <Link className='hidden sm:block' href={'/dashboard'}>
                    <Button variant={'link'} className="m-4 rounded-full">
                        <ArrowLeftCircleIcon size={16} />
                    </Button>
                </Link>
                <Card className="flex h-24  w-full flex-col p-2 sm:w-[550px]">
                    <p className="self-end p-1 text-sm leading-none text-muted-foreground">
                        {rows[0]?.created_on_date}
                    </p>
                    <CardContent className="flex h-full items-center gap-4 self-center">
                        <Suspense fallback={<Loading />}>
                            <p className="inline-flex items-center justify-center text-base font-semibold sm:text-lg">
                                <GithubIcon className="mr-2 inline-block" />
                                {rows[0]?.repo_name}
                            </p>
                            {/* <p className="text-sm leading-none text-muted-foreground">{rows[0]?.created_on_date}</p> */}
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
            <Card className="relative mt-2 h-full sm:w-[650px]">
                <CardHeader>
                    <CardTitle>Generated Text</CardTitle>
                </CardHeader>
                <div className="flex h-full grow items-center justify-center">
                    <CardContent className="">
                        <DeleteGenerationButton
                            generationID={params.generation}
                            className="absolute right-0 top-0 m-4 "
                        />
                        {rows[0]?.generated_text}
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default GenerationPage
