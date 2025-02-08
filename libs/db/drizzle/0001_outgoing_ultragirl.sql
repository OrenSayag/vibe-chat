CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"bucket" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
