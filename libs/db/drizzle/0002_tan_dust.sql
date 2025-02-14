CREATE TABLE "subscriptions_template_drafts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"template" json NOT NULL
);
