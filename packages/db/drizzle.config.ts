import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./src/schema.ts",
  out: "./drizzle/migrations",
  driver: "mysql2",
  strict: false,
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
} satisfies Config;
