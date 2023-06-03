import React, { Suspense } from 'react'
import { conn } from '@/lib/planetscale'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
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
        <div className="flex h-full grow flex-col items-center justify-center gap-2">
            <div className="mt-10 flex items-center">
                <Link href={'/dashboard'}>
                    <Button className="m-4 rounded-full">
                        <ArrowLeftCircleIcon />
                    </Button>
                </Link>
                <Card className="relative h-24 w-full p-2 sm:w-[550px]">
                    <CardContent className="flex h-full items-center gap-4">
                        <Suspense fallback={<Loading />}>
                            <p className="text-lg font-semibold">
                                <GithubIcon className="mr-2 inline-block" />
                                {rows[0]?.repo_name}
                            </p>
                            <p className="absolute right-0 top-0 m-4 text-sm leading-none text-muted-foreground">
                                {rows[0]?.created_on_date}
                            </p>
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
            <Card className="relative m-4 mt-2 h-full w-[650px]">
                {/* <CardHeader>
				<CardTitle>
					<GithubIcon className="inline-block mr-2" size={16} />
					aabassiouni/framebound
				</CardTitle>
				<CardDescription>
					<p>38 files, </p>
				</CardDescription>
			</CardHeader> */}
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
