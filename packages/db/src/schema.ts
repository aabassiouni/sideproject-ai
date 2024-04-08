import { sql } from "drizzle-orm";
import {
  AnyMySqlColumn,
  binary,
  char,
  int,
  longtext,
  mysqlSchema,
  mysqlTable,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const errors = mysqlTable("errors", {
  errorID: varchar("error_id", { length: 256 }).notNull().primaryKey(),
  userID: varchar("clerk_user_id", { length: 255 }).notNull(),
  repoName: varchar("repo_name", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`),
  errorMessage: longtext("error_message"),
  errorType: varchar("error_type", { length: 100 }),
});

export const generations = mysqlTable("generations", {
  generationID: varchar("generation_id", { length: 256 }).notNull().primaryKey(),
  userID: varchar("user_id", { length: 255 }),
  repoName: varchar("repo_name", { length: 255 }),
  generatedText: text("generated_text"),
  bullets: text("bullets"),
  rating: tinyint("rating").default(0).notNull(),
  deleted: tinyint("deleted").default(0).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`),
});

export const users = mysqlTable("users", {
  userID: varchar("user_id", { length: 255 }).notNull().primaryKey(),
  createdOn: timestamp("created_on", { mode: "string" }),
  lastLogin: timestamp("last_login", { mode: "string" }),
  credits: int("credits"),
  email: text("email"),
  referral: varchar("referral", { length: 255 }),
});
