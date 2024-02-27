import { db } from './db'
import { errors } from './schema'

export async function insertError(
    error_id: string,
    userId: string,
    generation_id: string,
    repo: string,
    error_message: string,
    error_type: string
) {
    const error = await db.insert(errors).values({
        errorID: error_id,
        userID: userId,
        generationID: generation_id,
        repoName: `${repo}`,
        errorMessage: error_message,
        errorType: error_type,
    })

    return
}
