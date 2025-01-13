import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle, errors, generations, users } from "@sideproject-ai/db";

const connectionString = process.env.DATABASE_URL!;

neonConfig.fetchConnectionCache = true;

if (process.env.NODE_ENV === "development") {
  neonConfig.fetchEndpoint = (host) => {
    const protocol = host === "db.localtest.me" ? "http" : "https";
    const port = host === "db.localtest.me" ? 4444 : 443;
    return `${protocol}://${host}:${port}/sql`;
  };
}

const neonDB = neon(connectionString);

export const db = drizzle(neonDB, {
  schema: {
    errors,
    generations,
    users,
  },
});
