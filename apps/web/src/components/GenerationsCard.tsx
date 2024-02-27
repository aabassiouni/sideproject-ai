// import React, { Suspense } from 'react'
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
// import { Separator } from './ui/separator'
// import Link from 'next/link'
// import { currentUser } from '@clerk/nextjs'
// import { conn } from '@/lib/planetscale'
// import StartWritingButton from './buttons/StartWritingButton'
// import DeleteGenerationButton from './buttons/DeleteGenerationButton'

// export const revalidate = 1

// type Generation = {
//     generation_id_uuid: string
//     user_id: string
//     repo_name: string
//     created_on_date: string
//     generated_text: string
// }

// function GenerationCard({ generation }: { generation: Generation }) {
//     return (
//         <Card className="flex w-full items-center justify-around bg-slate-100 p-4 py-2 sm:w-full">
//             <Link href={`/dashboard/${generation.generation_id_uuid}`}>
//                 <div className="w-44 overflow-ellipsis">
//                     <p className="line-clamp-1 text-ellipsis text-sm font-medium  tracking-tight sm:text-base">
//                         {generation.repo_name.split('/')[1]}
//                     </p>
//                 </div>
//                 <div className="line-clamp-1 w-fit text-sm text-slate-400">
//                     <p>{generation.created_on_date}</p>
//                 </div>
//             </Link>
//             <div className="flex items-center gap-1.5">
//                 {/* <Button size={'sm'}>View</Button> */}
//                 <DeleteGenerationButton generationID={generation.generation_id_uuid} />
//             </div>
//         </Card>
//     )
// }

// async function GenerationsCard() {
//     const user = await currentUser()
//     const results = await conn.execute(
//         'SELECT user_id, repo_name, created_on_date, generated_text, BIN_TO_UUID(generation_id) AS generation_id_uuid FROM generations Where user_id = ? ;',
//         [user?.id]
//     )
//     let generations = results.rows

//     return (
//         <Card className="mt-10 h-fit min-h-full w-full sm:w-[650px] ">
//             <CardHeader className="items-center justify-between sm:flex-row">
//                 <CardTitle className="p-2 sm:p-0">Generations</CardTitle>
//                 <Link href="/dashboard/write">
//                     <StartWritingButton className="bg-gradient-to-r from-cyan-500 to-blue-500" />
//                 </Link>
//             </CardHeader>
//             <Separator />
//             <CardContent className=" my-auto flex min-h-[50px] flex-col gap-2 overflow-x-scroll p-2">
//                 {/* <div className="p-2 my-auto gap-4 overflow-x-scroll"> */}
//                 {generations?.length > 0 ? (
//                     generations.map((generation: any) => <GenerationCard generation={generation} />)
//                 ) : (
//                     <p className="text-center text-slate-400">No generations yet!</p>
//                 )}
//                 {/* </div> */}
//             </CardContent>
//             <CardFooter />
//         </Card>
//     )
// }

// export default GenerationsCard
