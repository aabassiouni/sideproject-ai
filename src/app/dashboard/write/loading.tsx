import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader } from '@/components/ui/card'

function Loading() {
    return (
        <div className="flex h-screen flex-col sm:flex-row">
            <Card className="min-h-44 gap-2 m-4 my-2 flex h-fit flex-col items-center p-3 py-3 pt-11 sm:hidden">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                

            </Card>
            <div className="hidden max-w-sm flex-col items-center space-y-1.5 overflow-x-hidden rounded-xl bg-white px-6 py-5 sm:flex sm:max-h-screen sm:min-w-[400px] sm:rounded-none sm:rounded-tr-xl">
                <Skeleton className="h-36 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
            <div className="flex grow flex-col">
                <div className="m-4 mx-auto my-2 basis-1/4">
                    <Card className="w-80 sm:h-full">
                        <div className="flex flex-col justify-center sm:flex-row">
                            <div className="sm:basis-1/3  ">
                                <CardHeader className="flex h-44 items-center justify-center">
                                    <Skeleton className="h-4 w-44" />
                                </CardHeader>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card className="m-4 mt-2 flex h-full items-center justify-center sm:min-w-0">
                    <Skeleton className="h-4 w-44" />
                </Card>
            </div>
        </div>
    )
}

export default Loading
