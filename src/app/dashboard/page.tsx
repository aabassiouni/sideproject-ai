import React, { Suspense } from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs'
import { conn } from '@/lib/planetscale'
import GenerationsCard from '@/components/GenerationsCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import StartWritingButton from '@/components/StartWritingButton'

export const dynamic = 'force-dynamic'

function GenerationsCardLoading() {
	return (
		<Card className="w-full sm:w-[650px] ">
			<CardHeader className="space-y-4">
				<CardTitle>Generations</CardTitle>
				<Separator />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-12" />
			</CardHeader>
		</Card>
		
	)
}
async function DashboardPage() {
    const user = await currentUser()

    console.log(user)

    // const results = await conn.execute(
    //     'SELECT user_id, repo_name, created_on_date, generated_text, BIN_TO_UUID(generation_id) AS generation_id_uuid FROM generations;',
    //     [user?.id]
    // )
    // let generations = results.rows

    return (
        <div className="flex h-screen flex-col items-center gap-4 p-4 pt-0">
            <Card className="mt-10 w-full sm:w-[450px]">
                <CardHeader className="flex flex-row items-center justify-center gap-4 text-center">
                    <div className="grow">
                        <p className="text-base sm:text-lg  font-semibold">
                            {user?.username ?? user?.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href="/dashboard/write">
                            <StartWritingButton />
                        </Link>
                    </div>
                </CardHeader>
            </Card>
            <Suspense fallback={<GenerationsCardLoading />}>
				{/* @ts-ignore */}
                <GenerationsCard  />
            </Suspense>
        </div>
    )
}

export default DashboardPage
