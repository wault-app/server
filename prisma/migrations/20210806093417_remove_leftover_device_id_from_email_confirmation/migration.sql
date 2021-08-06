/*
  Warnings:

  - You are about to drop the column `temporaryDeviceId` on the `email_confirmation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "email_confirmation" DROP COLUMN "temporaryDeviceId";
