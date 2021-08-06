/*
  Warnings:

  - You are about to drop the column `passed` on the `authentications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `authentications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "passed",
ADD COLUMN     "deviceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "authentications_deviceId_unique" ON "authentications"("deviceId");

-- AddForeignKey
ALTER TABLE "authentications" ADD FOREIGN KEY ("deviceId") REFERENCES "devices"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
