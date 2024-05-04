import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import { Client } from "@neondatabase/serverless";

export type Database = NeonDatabase<typeof schema>;

export interface Env {
  DATABASE_URL: string;
  database: Database;
  client: Client;
}
