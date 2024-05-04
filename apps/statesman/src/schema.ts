import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { generateId } from "@repo/common";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    username: text("username").unique().notNull(),
    venmo: text("venmo").unique(),
    email: text("email").unique(),
  },
  (table) => {
    return {
      usernameIdx: index("username_idx").on(table.username),
      venmoIdx: index("venmo_idx").on(table.venmo),
      emailIdx: index("email_idx").on(table.email),
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
