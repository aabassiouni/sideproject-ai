import { deleteGeneration, fetchGenerationByID } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    console.log('/////////////////////// deleting generation ////////////////////////')
    const { userId } = auth()
    const { generationID } = await request.json()

    console.log('looking for generation:', generationID)

    const generation = await fetchGenerationByID(generationID)

    console.log('generation from db', generation)

    if (userId) {
        if (userId === generation.userID) {
            console.log('deleting generation', generationID)

            await deleteGeneration(generationID, userId)

            revalidatePath('/dashboard')
            return NextResponse.json({ generationID })
        } else {
            return NextResponse.json({ error: 'not authorized' })
        }
    } else {
        return NextResponse.json({ error: 'not logged in' })
    }
}
