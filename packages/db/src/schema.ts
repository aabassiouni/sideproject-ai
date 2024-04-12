import { pgTable, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const errors = pgTable("errors", {
  errorID: varchar("error_id", { length: 256 }).notNull().primaryKey(),
  userID: varchar("clerk_user_id", { length: 255 }).references(() => users.userID),
  repoName: varchar("repo_name", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).defaultNow(),
  errorMessage: text("error_message"),
  errorType: varchar("error_type", { length: 100 }),
});

export const generations = pgTable("generations", {
  generationID: varchar("generation_id", { length: 256 }).notNull().primaryKey(),
  userID: varchar("user_id", { length: 255 }).references(() => users.userID),
  repoName: varchar("repo_name", { length: 255 }),
  generatedText: text("generated_text"),
  bullets: text("bullets"),
  rating: smallint("rating").default(0).notNull(),
  deleted: smallint("deleted").default(0).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).defaultNow(),
});

export const users = pgTable("users", {
  userID: varchar("user_id", { length: 255 }).notNull().primaryKey(),
  createdOn: timestamp("created_on", { mode: "string" }).defaultNow(),
  credits: smallint("credits"),
  referral: varchar("referral", { length: 255 }),
});
