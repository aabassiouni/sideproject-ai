import { Client } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

import { errors, generations, users } from '@sideproject-ai/db'

const connection = new Client({
    url: process.env['DATABASE_URL'],
})

export const db = drizzle(connection, {
    schema: {
        errors,
        generations,
        users,
    },
})
