/*
  Warnings:

  - Changed the type of `deviceType` on the `authentications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deviceType` on the `email_confirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "deviceType",
ADD COLUMN     "deviceType" "DeviceType" NOT NULL;

-- AlterTable
ALTER TABLE "email_confirmation" DROP COLUMN "deviceType",
ADD COLUMN     "deviceType" "DeviceType" NOT NULL;
