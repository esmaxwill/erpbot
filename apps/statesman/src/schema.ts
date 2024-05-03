import { index, pgTable, text } from "drizzle-orm/pg-core";

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
