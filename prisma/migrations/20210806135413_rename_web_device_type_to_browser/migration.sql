/*
  Warnings:

  - The values [WEB] on the enum `DeviceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeviceType_new" AS ENUM ('BROWSER', 'MOBILE', 'DESKTOP', 'CLI');
ALTER TABLE "email_confirmation" ALTER COLUMN "deviceType" TYPE "DeviceType_new" USING ("deviceType"::text::"DeviceType_new");
ALTER TABLE "authentications" ALTER COLUMN "deviceType" TYPE "DeviceType_new" USING ("deviceType"::text::"DeviceType_new");
ALTER TABLE "devices" ALTER COLUMN "type" TYPE "DeviceType_new" USING ("type"::text::"DeviceType_new");
ALTER TYPE "DeviceType" RENAME TO "DeviceType_old";
ALTER TYPE "DeviceType_new" RENAME TO "DeviceType";
DROP TYPE "DeviceType_old";
COMMIT;
