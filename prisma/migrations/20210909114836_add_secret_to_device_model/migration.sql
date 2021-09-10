/*
  Warnings:

  - You are about to drop the column `session_token` on the `devices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "devices" DROP COLUMN "session_token",
ADD COLUMN     "secret" TEXT;
