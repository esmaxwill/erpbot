import { WorkerEntrypoint } from "cloudflare:workers";
import { eq } from "drizzle-orm/sql";

import * as schema from "../schema";
import type { Database, Env } from "../types";
import { Client } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

export interface UserType {
  id: string;
  username: string;
  venmo?: string;
}

export class Users extends WorkerEntrypoint<Env> {
  private database: Database;
  private client: Client;

  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);
    this.client = new Client(env.DATABASE_URL);
    this.database = drizzle(this.client, { schema });
  }

  setupDb() {
    this.env.client = new Client(this.env.DATABASE_URL);
    this.database = drizzle(this.client, { schema });
  }

  begin(): Database {
    this.client.connect();
    return this.database;
  }

  end() {
    this.ctx.waitUntil(this.client.end());
  }

  async createUser(user: UserType): Promise<any> {
    const db = this.begin();
    const result = await db.insert(schema.users).values(user);
    this.end();
    return result.rows[0];
  }

  async getById(id: string): Promise<any> {
    const db = this.begin();
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));

    this.end();
    return result[0];
  }

  async getByName(username: string): Promise<any> {
    const db = this.begin();
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username));

    this.end();
    return result;
  }
}
