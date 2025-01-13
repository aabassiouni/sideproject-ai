import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle, errors, generations, users } from "@sideproject-ai/db";
import { Config } from "sst/node/config";

const connectionString = Config.DATABASE_URL;

neonConfig.fetchConnectionCache = true;
const neonDB = neon(connectionString);

export const db = drizzle(neonDB, {
  schema: {
    errors,
    generations,
    users,
  },
});
