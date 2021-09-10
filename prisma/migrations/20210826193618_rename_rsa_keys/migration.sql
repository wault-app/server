/*
  Warnings:

  - You are about to drop the column `publicRSAKey` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `privateRSAKey` on the `email_confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `publicRSAKey` on the `email_confirmation` table. All the data in the column will be lost.
  - You are about to drop the column `privateRSAKey` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `publicRSAKey` on the `users` table. All the data in the column will be lost.
  - Added the required column `publicKey` to the `authentications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateKey` to the `email_confirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `email_confirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateKey` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "publicRSAKey",
ADD COLUMN     "publicKey" TEXT NOT NULL,
ALTER COLUMN "deviceType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "email_confirmation" DROP COLUMN "privateRSAKey",
DROP COLUMN "publicRSAKey",
ADD COLUMN     "privateKey" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL,
ALTER COLUMN "deviceName" DROP NOT NULL,
ALTER COLUMN "deviceType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "privateRSAKey",
DROP COLUMN "publicRSAKey",
ADD COLUMN     "privateKey" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL;
