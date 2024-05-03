import { relations } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { generateId } from "@monorepo/common";


export const invoices = sqliteTable("invoices", {
    id: text("id").primaryKey().$defaultFn(generateId),
    paypal_invoice_id: text("id").notNull()
});