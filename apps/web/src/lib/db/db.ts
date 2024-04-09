import { errors, generations, users } from "@sideproject-ai/db";
import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

const connectionString = process.env.DATABASE_URL!;

const client = createPool({
  connectionString: connectionString,
});

export const db = drizzle(client, {
  schema: {
    errors,
    generations,
    users,
  },
});
