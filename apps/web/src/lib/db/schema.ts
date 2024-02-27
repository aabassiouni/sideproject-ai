// import { sql } from 'drizzle-orm'
// import { mysqlTable, longtext, varchar, char, binary, timestamp, tinyint, text, int } from 'drizzle-orm/mysql-core'

// export const errors = mysqlTable('errors', {
//     errorID: char('error_id', { length: 36 }).notNull(),
//     clerkUserID: varchar('clerk_user_id', { length: 255 }).notNull(),
//     generationID: binary('generation_id', { length: 16 }).notNull(),
//     repoName: varchar('repo_name', { length: 255 }).notNull(),
//     timestamp: timestamp("timestamp", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
//     errorMessage: longtext('error_message'),
//     errorType: varchar('error_type', { length: 100 }),
// })

// export const generations = mysqlTable('generations', {
//     userID: varchar('user_id', { length: 255 }),
//     repoName: varchar('repo_name', { length: 255 }),
//     generatedText: longtext('generated_text'),
//     generationID: binary('generation_id', { length: 16 }).notNull(),
//     bullets: text('bullets'),
//     rating: tinyint('rating').notNull().default(0),
//     deleted: tinyint('deleted').notNull().default(0),
//     timestamp: timestamp('timestamp').defaultNow(),
// })

// export const users = mysqlTable('users', {
//     clerkUserID: varchar('clerk_user_id', { length: 255 }).notNull(),
//     createdOn: timestamp('created_on'),
//     lastLogin: timestamp('last_login'),
//     credits: int('credits'),
//     email: text('email'),
//     referral: varchar('referral', { length: 255 }),
// })

import {
    mysqlTable,
    mysqlSchema,
    AnyMySqlColumn,
    char,
    varchar,
    binary,
    timestamp,
    longtext,
    text,
    tinyint,
    int,
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const errors = mysqlTable('errors', {
    errorID: varchar('error_id', { length: 256 }).notNull().primaryKey(),
    generationID: binary('generation_id', { length: 16 }).notNull(),
    userID: varchar('clerk_user_id', { length: 255 }).notNull(),
    repoName: varchar('repo_name', { length: 255 }).notNull(),
    timestamp: timestamp('timestamp', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
    errorMessage: longtext('error_message'),
    errorType: varchar('error_type', { length: 100 }),
})

export const generations = mysqlTable('generations', {
    generationID: varchar('generation_id', { length: 256 }).notNull().primaryKey(),
    userID: varchar('user_id', { length: 255 }),
    repoName: varchar('repo_name', { length: 255 }),
    generatedText: text('generated_text'),
    bullets: text('bullets'),
    rating: tinyint('rating').default(0).notNull(),
    deleted: tinyint('deleted').default(0).notNull(),
    timestamp: timestamp('timestamp', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
})

export const users = mysqlTable('users', {
    userID: varchar('user_id', { length: 255 }).notNull().primaryKey(),
    createdOn: timestamp('created_on', { mode: 'string' }),
    lastLogin: timestamp('last_login', { mode: 'string' }),
    credits: int('credits'),
    email: text('email'),
    referral: varchar('referral', { length: 255 }),
})
