import { InferModel } from 'drizzle-orm'
import { errors, generations } from './schema'

export * from './generations'
export * from './users'
export * from './errors'

export type Generation = InferModel<typeof generations>
export type Error = InferModel<typeof errors>
