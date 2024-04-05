import { drizzle } from "drizzle-orm/planetscale-serverless";

import { Client } from "@planetscale/database";
import { generations, errors, users, sql } from "@sideproject-ai/db";

import { Config } from "sst/node/config";

const connection = new Client({
  url: Config.DATABASE_URL,
});

export const db = drizzle(connection, {
  schema: {
    errors,
    generations,
    users,
  },
});
