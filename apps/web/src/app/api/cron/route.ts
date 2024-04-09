import { db } from '@/lib/db/db'
import { sql } from 'drizzle-orm'
import { unstable_noStore } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
    console.log('running cron job')
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
    }
    const version = await db.execute(sql`SELECT version();`)

    return Response.json({ message: 'success' })
}
