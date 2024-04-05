import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }
// console.log(process.env.DATABASE_URL);
// console.log(process.env.DATABASE_HOST);
// console.log(process.env.DATABASE_USERNAME);
// console.log(process.env.DATABASE_PASSWORD);

export default {
  schema: "./src/schema.ts",
  out: "./drizzle/migrations",
  driver: "mysql2",
  strict: false,
  dbCredentials: {
    // host: process.env.DATABASE_HOST,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: "sideproject_ai",
    
    uri: process.env.DATABASE_URL!,
  },
} satisfies Config;
