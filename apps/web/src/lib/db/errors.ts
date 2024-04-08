import { errors } from '@sideproject-ai/db'
import { db } from './db'

export async function insertError(
    error_id: string,
    userId: string,
    repo: string,
    error_message: string,
    error_type: string
) {
    const error = await db.insert(errors).values({
        errorID: error_id,
        userID: userId,
        repoName: `${repo}`,
        errorMessage: error_message,
        errorType: error_type,
    })

    return
}
