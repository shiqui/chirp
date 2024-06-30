import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env";

const connectionString = env.DATABASE_URL;
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);
