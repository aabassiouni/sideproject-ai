import { Client } from '@planetscale/database'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { errors, generations, users } from './schema'

dotenv.config({ path: '.env.local' })

const runMigration = async () => {
    console.log('Running migration')
    console.log('Running on ' + process.env.DATABASE_URL!)

    if (!process.env.DATABASE_URL) {
        throw new Error('No database URL')
    }

    const planetscale = new Client({
      url: process.env.DATABASE_URL,
    });

    const db = drizzle(planetscale, {
        schema: {
            errors,
            generations,
            users,
        },
    })

    await migrate(db, { migrationsFolder: './drizzle/migrations' })

    console.log('Migration complete')
}

runMigration().catch((err) => {
    console.error(err)
    process.exit(1)
})
