-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" VARCHAR(127) NOT NULL,
    "type" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT NOT NULL,
    "ip_address" TEXT,
    "submitter" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
