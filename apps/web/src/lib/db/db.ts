import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { errors, generations, users } from "@sideproject-ai/db";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, {
  schema: {
    errors,
    generations,
    users,
  },
});
