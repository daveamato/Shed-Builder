CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(30) UNIQUE,
	"email" VARCHAR(30) UNIQUE,
	"firstName" TEXT,
	"lastName" TEXT,
	"password" VARCHAR
);
