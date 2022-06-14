/*
  Warnings:

  - You are about to drop the column `ip_address` on the `Token` table. All the data in the column will be lost.
  - Made the column `submitter` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "ip_address",
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "submitter" SET NOT NULL;
