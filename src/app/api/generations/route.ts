import { deleteGeneration } from '@/lib/db'
import { conn } from '@/lib/planetscale'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = "edge"

type Generation = {
    generation_id?: string
    user_id?: string
    repo_name?: string
    created_on_date?: string
    generated_text?: string
}


export async function POST(request: NextRequest) {
    console.log('/////////////////////// deleting generation ////////////////////////')
    const { userId } = auth()
    const { generationID } = await request.json()

    console.log('looking for generation:', generationID)
    const { rows: generationFromDB } = (await conn.execute(
        'SELECT * FROM generations WHERE generation_id = UUID_TO_BIN(?)',
        [generationID]
    )) as { rows: Generation[] }

    console.log('generation from db', generationFromDB)

    if (userId) {
        if (userId === generationFromDB[0].user_id) {
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
