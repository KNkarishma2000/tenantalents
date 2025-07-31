/*
  Warnings:

  - The values [pending,approved,rejected] on the enum `SellerStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [buyer,seller,buyer_seller,admin,super_admin] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "ModerationActionType" AS ENUM ('SUSPEND_SELLER', 'REMOVE_PRODUCT', 'APPROVE_SELLER', 'REJECT_SELLER', 'WARN_SELLER', 'SYSTEM_NOTE');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('SELLER', 'PRODUCT', 'USER', 'ORDER');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'RESOLVED', 'ESCALATED', 'DISMISSED');

-- AlterEnum
BEGIN;
CREATE TYPE "SellerStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');
ALTER TABLE "Seller" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Seller" ALTER COLUMN "status" TYPE "SellerStatus_new" USING ("status"::text::"SellerStatus_new");
ALTER TYPE "SellerStatus" RENAME TO "SellerStatus_old";
ALTER TYPE "SellerStatus_new" RENAME TO "SellerStatus";
DROP TYPE "SellerStatus_old";
ALTER TABLE "Seller" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "actionType" "ModerationActionType" NOT NULL,
    "targetType" "TargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE INDEX "ActionLog_targetType_idx" ON "ActionLog"("targetType");

-- CreateIndex
CREATE INDEX "ActionLog_targetId_idx" ON "ActionLog"("targetId");

-- CreateIndex
CREATE INDEX "ActionLog_status_idx" ON "ActionLog"("status");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLog" ADD CONSTRAINT "ActionLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
