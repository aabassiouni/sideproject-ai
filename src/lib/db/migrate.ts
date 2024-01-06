import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import * as dotenv from 'dotenv'
import { connect } from '@planetscale/database'
import { errors, generations, users } from './schema'

dotenv.config({ path: '.env.local' })

const runMigration = async () => {
    console.log('Running migration')
    console.log('Running on ' + process.env.DATABASE_URL!)

    if (!process.env.DATABASE_URL) {
        throw new Error('No database URL')
    }

    const planetscale = connect({
        host: process.env['DATABASE_HOST'],
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
    })

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
