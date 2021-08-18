/*
  Warnings:

  - You are about to drop the column `deviceId` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `rsaKey` on the `authentications` table. All the data in the column will be lost.
  - You are about to drop the column `rsaKey` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `rsaKey` on the `email_confirmation` table. All the data in the column will be lost.
  - You are about to drop the `key_exchanges` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `publicRSAKey` to the `authentications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `email_confirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateRSAKey` to the `email_confirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicRSAKey` to the `email_confirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `keycards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateRSAKey` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicRSAKey` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "authentications" DROP CONSTRAINT "authentications_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "key_exchanges" DROP CONSTRAINT "key_exchanges_device_id_fkey";

-- DropForeignKey
ALTER TABLE "key_exchanges" DROP CONSTRAINT "key_exchanges_safe_id_fkey";

-- DropIndex
DROP INDEX "authentications_deviceId_unique";

-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "deviceId",
DROP COLUMN "rsaKey",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "publicRSAKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "rsaKey",
ADD COLUMN     "authenticationId" TEXT;

-- AlterTable
ALTER TABLE "email_confirmation" DROP COLUMN "rsaKey",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "privateRSAKey" TEXT NOT NULL,
ADD COLUMN     "publicRSAKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "keycards" ADD COLUMN     "secret" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "safes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "privateRSAKey" TEXT NOT NULL,
ADD COLUMN     "publicRSAKey" TEXT NOT NULL;

-- DropTable
DROP TABLE "key_exchanges";
