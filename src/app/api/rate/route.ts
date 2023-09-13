import { updateGenerationRating } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('////////////////////// /api/rate //////////////////////')
    if (request.body === undefined || request.body === null) return new NextResponse('Missing body', { status: 400 })

    const { rating, generationID } = await request.json()

    // const generation = await updateGenerationRating(generationID, rating)

    return NextResponse.json({
        status: 200,
        
    })
}
