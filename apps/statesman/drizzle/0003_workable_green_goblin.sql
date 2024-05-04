CREATE TABLE IF NOT EXISTS "games" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"starts_at" timestamp with time zone,
	"venmo" text,
	"email" text,
	CONSTRAINT "games_venmo_unique" UNIQUE("venmo"),
	CONSTRAINT "games_email_unique" UNIQUE("email")
);
