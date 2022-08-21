/*
  Warnings:

  - You are about to drop the column `userId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_userId_fkey";

-- DropIndex
DROP INDEX "Schedule_userId_idx";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "userId";
