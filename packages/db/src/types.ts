import { InferModel } from "drizzle-orm";
import { errors, generations, users } from "./schema";

export type Generation = InferModel<typeof generations>;
export type Error = InferModel<typeof errors>;
export type User = InferModel<typeof users>;
