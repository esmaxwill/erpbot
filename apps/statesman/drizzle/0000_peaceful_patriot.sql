CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"venmo" text,
	"email" text,
	CONSTRAINT "users_venmo_unique" UNIQUE("venmo")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venmo_idx" ON "users" ("venmo");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");