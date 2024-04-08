import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
	throw new Error("No database URL");
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
