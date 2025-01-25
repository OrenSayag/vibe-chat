CREATE TABLE "subscription_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"info" json NOT NULL,
	"subscription_id" integer
);
--> statement-breakpoint
CREATE TABLE "subscription_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"subscription_id" integer,
	"contact_id" integer,
	"info" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"info" json NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscription_contacts" ADD CONSTRAINT "subscription_contacts_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_messages" ADD CONSTRAINT "subscription_messages_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_messages" ADD CONSTRAINT "subscription_messages_contact_id_subscription_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."subscription_contacts"("id") ON DELETE no action ON UPDATE no action;