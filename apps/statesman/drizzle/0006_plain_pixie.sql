ALTER TABLE "users" ADD COLUMN "public_key" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "public_key_idx" ON "users" ("public_key");