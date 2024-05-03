import { Client } from '@neondatabase/serverless';
import type { NeonDatabase } from 'drizzle-orm/neon-serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "./schema";


export interface DbPair {
    client: Client;
    db: NeonDatabase<typeof schema>;
}

export function getClient(env: any): DbPair {
    const client = new Client(env.DATABASE_URL);
    const db = drizzle(client, {schema});
    return {
        client,
        db
    }
}