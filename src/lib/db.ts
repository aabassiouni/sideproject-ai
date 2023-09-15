import { conn } from '@/lib/planetscale'

type Generation = {
    generation_id?: string
    user_id?: string
    repo_name?: string
    created_on_date?: string
    generated_text?: string
    bullets?: string
}
export async function insertGeneration(
    generation_id: string,
    userId: string,
    owner: string,
    repo: string,
    res: any,
    bullets: string[]
) {
    await conn.execute(
        'Insert into generations (generation_id, user_id, repo_name, created_on_date, generated_text, bullets ) values (UUID_TO_BIN(?), ?, ?, ?, ?, ?)',
        [generation_id, userId, `${owner}/${repo}`, new Date(), res?.text, JSON.stringify(bullets)]
    )
}

export async function fetchAllGenerations(userId: string) {
    const results = await conn.execute(
        'SELECT user_id, repo_name, created_on_date, generated_text, BIN_TO_UUID(generation_id) AS generation_id_uuid FROM generations Where user_id = ? ;',
        [userId]
    )
    let generations = results.rows

    return generations
}

export async function fetchGeneration(generation_id: string) {
    const { rows } = (await conn.execute('SELECT * FROM generations WHERE generation_id = UUID_TO_BIN(?)', [
        generation_id,
    ])) as { rows: Generation[] }
    
    const generation = rows[0]
    return generation
}

export async function updateGenerationRating(generation_id: string, rating: number) {
    await conn.execute('UPDATE generations SET rating = ? WHERE generation_id = BIN_TO_UUID(?)', [
        rating,
        generation_id,
    ])
}

export async function deleteGeneration(generation_id: string, userId: string) {
    await conn.execute('UPDATE generations SET deleted = true WHERE generation_id = UUID_TO_BIN(?) AND user_id = ?', [
        generation_id,
        userId,
    ])
}


export async function insertUser(userId: string, email: string, credits: number) {
    await conn.execute('INSERT INTO users (clerk_user_id, email, credits) VALUES (?, ?, ?);', [userId, email, credits])
}

export async function updateUserCredits(userId: string) {
    await conn.execute('UPDATE users SET credits = credits - 1 WHERE clerk_user_id = ?', [userId])
}

export async function fetchUserCredits(userId: string) {
    
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    await delay(2000)
    for (let i = 0; i < 10; i++) {
        const { rows } = (await conn.execute('SELECT credits FROM users WHERE clerk_user_id = ?', [userId])) as {
            rows: { credits?: number }[]
        }
        if (rows.length > 0 && rows[0].credits !== undefined) {
            return rows[0].credits
        }

        await delay(1500)
        // const credits = rows[0].credits ?? 0
        // return credits
    }

    return 0
}

export async function insertError(
    error_id: string,
    userId: string,
    generation_id: string,
    repo: string,
    error_message: string,
    error_type: string
) {
    await conn.execute(
        'INSERT INTO errors (error_id, clerk_user_id, generation_id, repo_name, error_message, error_type) VALUES (?, ?, UUID_TO_BIN(?), ?, ?,?)',
        [error_id, userId, generation_id, `${repo}`, error_message, error_type]
    )
}

