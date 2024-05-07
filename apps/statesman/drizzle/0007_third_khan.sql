ALTER TABLE "addresses" ADD COLUMN "api_id" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "discord_user_id" text;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "encrypted_blob" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "api_id_idx" ON "addresses" ("api_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "discord_user_id_idx" ON "addresses" ("discord_user_id");--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "data";--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_api_id_unique" UNIQUE("api_id");