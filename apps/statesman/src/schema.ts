import { index, pgTable, text, timestamp, json } from "drizzle-orm/pg-core";

import { generateId } from "@repo/common";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    username: text("username").unique().notNull(),
    venmo: text("venmo").unique(),
    email: text("email").unique(),
    publicKey: text("public_key"),
  },
  (table) => {
    return {
      usernameIdx: index("username_idx").on(table.username),
      venmoIdx: index("venmo_idx").on(table.venmo),
      emailIdx: index("email_idx").on(table.email),
      publicKeyIdx: index("public_key_idx").on(table.publicKey),
    };
  },
);

export const games = pgTable("games", {
  id: text("id").primaryKey().$defaultFn(generateId),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  venmo: text("venmo").unique(),
  email: text("email").unique(),
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey().$defaultFn(generateId),
  data: json("data").default({}),
});

export const shipments = pgTable("shipments", {
  id: text("id").primaryKey().$defaultFn(generateId),
  data: json("data").default({}),
});

export const addresses = pgTable(
  "addresses",
  {
    id: text("id").primaryKey().$defaultFn(generateId),
    apiId: text("api_id").unique(),
    discordUserId: text("discord_user_id"),
    encrypted_blob: text("encrypted_blob"),
  },
  (table) => {
    return {
      apiIdIdx: index("api_id_idx").on(table.apiId),
      discordUserIdIdx: index("discord_user_id_idx").on(table.discordUserId),
    };
  },
);
