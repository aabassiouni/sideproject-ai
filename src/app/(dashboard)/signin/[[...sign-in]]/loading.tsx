import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-slate-200">
            <h1 className="font-necto text-2xl font-bold">sideprojectAI</h1>
            <Skeleton className="h-1/4 w-1/4" />
        </div>
    )
}

export default Loading
