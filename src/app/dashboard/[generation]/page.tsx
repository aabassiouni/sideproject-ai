import React, { Suspense } from 'react'
import { conn } from '@/lib/planetscale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GithubIcon from '@/components/icons/GithubIcon'
import DeleteGenerationButton from '@/components/buttons/DeleteGenerationButton'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

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
    const { rows } = (await conn.execute('SELECT * FROM generations WHERE generation_id = UUID_TO_BIN(?)', [
        params.generation,
    ])) as { rows: Generation[] }

    const bullets = JSON.parse(rows[0].bullets ?? '[]')

    return (
        <div className="flex flex-col items-center justify-center gap-2 px-4">
            <div className="mt-10 flex flex-col items-center sm:flex-row">
                <Link className="hidden sm:block" href={'/dashboard'}>
                    <Button variant={'ghost'} className="m-4  rounded-xl">
                        <ArrowLeftCircle size={24} />
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
                        <div className={`flex h-full items-start justify-start rounded-lg p-5`}>
                            <div className="h-full  w-full rounded-md  bg-slate-100 p-10 font-serif text-lg">
                                <p className=" my-1 font-bold">{bullets[0]}</p>
                                <Separator className="bg-black p-[1px]" />
                                <ul className="my-2 ml-6 list-disc [&>li]:mt-2 ">
                                    {/* <li contentEditable="true">{rows[0].generated_text.firstBullet}</li>
                                    <li>{rows[0].generated_text.secondBullet}</li>
                                    <li>{rows[0].generated_text.thirdBullet}</li>
                                    <li>{rows[0].generated_text.fourthBullet}</li>
                                    <li>{rows[0].generated_text.fifthBullet}</li> */}
                                    {bullets.slice(1).map((bullet: any) => (
                                        <li>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default GenerationPage
