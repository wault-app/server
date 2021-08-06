-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('EMOJI', 'IMAGE');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('OWNER', 'WRITER', 'READER');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('WEB', 'MOBILE', 'DESKTOP', 'CLI');

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "icons" (
    "_id" TEXT NOT NULL,
    "type" "IconType" NOT NULL,
    "value" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "email_confirmation" (
    "_id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rsaKey" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temporaryDeviceId" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "authentications" (
    "_id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "rsaKey" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "devices" (
    "_id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "rsaKey" TEXT NOT NULL,
    "logged_in_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "safes" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "key_exchanges" (
    "_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "safe_id" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "items" (
    "_id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "safe_id" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "keycards" (
    "_id" TEXT NOT NULL,
    "role" "RoleType" NOT NULL,
    "safe_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "icons_user_id_unique" ON "icons"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "keycards.safe_id_user_id_unique" ON "keycards"("safe_id", "user_id");

-- AddForeignKey
ALTER TABLE "icons" ADD FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authentications" ADD FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_exchanges" ADD FOREIGN KEY ("device_id") REFERENCES "devices"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_exchanges" ADD FOREIGN KEY ("safe_id") REFERENCES "safes"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD FOREIGN KEY ("safe_id") REFERENCES "safes"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keycards" ADD FOREIGN KEY ("safe_id") REFERENCES "safes"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keycards" ADD FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
