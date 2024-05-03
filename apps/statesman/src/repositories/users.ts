import * as schema from "../schema";

import { getClient } from "../db";

export interface UserType {
  id: string;
  username: string;
  venmo?: string;
}

export class UserRepository {
  static async createUser(ctx:any, env: any, user: UserType): Promise<any> {
    console.log(user);
    
    const { db, client } = getClient(env);
    client.connect();
    const result = await db.insert(schema.users).values(user);
    ctx.waitUntil(client.end());
    return result.rows[0];
  }

  // static async getById(env: any, id: string): Promise<any> {
  //   const db = drizzle(env.DB, { schema });
  //   const result = await db
  //     .select()
  //     .from(schema.users)
  //     .where(eq(schema.users.id, id));
  //   return result.length > 0 ? result[0] : undefined;
  // }

  // static async getByName(env, username: string): Promise<any> {
  //   const db = drizzle(env.DB, { schema });
  //   const result = await db
  //     .select()
  //     .from(schema.users)
  //     .where(eq(schema.users.username, username));
  //   return result.length > 0 ? result[0] : undefined;
  // }

  // static async getOrCreate(env, user: UserType): Promise<any> {
  //   const existing = await this.getById(env, user.id);
  //   console.log(existing);

  //   if (!existing) {
  //     return await this.createUser(env, user);
  //   } else {
  //     return existing;
  //   }
  // }
}
