CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" text NOT NULL
);
