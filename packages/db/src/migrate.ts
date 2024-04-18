import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { errors, generations, users } from "./schema";

dotenv.config({ path: ".env.local" });

const runMigration = async () => {
  console.log("Running migration");
  console.log(`Running on ${process.env.DATABASE_URL!}`);

  if (!process.env.DATABASE_URL) {
    throw new Error("No database URL");
  }

  const connectionString = process.env.DATABASE_URL!;

  const client = postgres(connectionString, { prepare: false });

  const db = drizzle(client, {
    schema: {
      errors,
      generations,
      users,
    },
  });

  await migrate(db, { migrationsFolder: "./drizzle/migrations" });

  console.log("Migration complete");
  process.exit(0);
};

runMigration().catch((err) => {
  console.error(err);
  process.exit(1);
});
