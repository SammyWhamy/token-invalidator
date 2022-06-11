/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(127)`.
  - The required column `guid` was added to the `Token` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ADD COLUMN     "guid" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(127),
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("guid");
