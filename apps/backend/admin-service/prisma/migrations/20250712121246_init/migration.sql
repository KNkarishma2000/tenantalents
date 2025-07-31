/*
  Warnings:

  - You are about to drop the column `gstNumber` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `storeName` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "gstNumber",
DROP COLUMN "storeName";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "phone";

-- DropTable
DROP TABLE "AdminUser";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropEnum
DROP TYPE "AdminRole";

-- DropEnum
DROP TYPE "OrderStatus";
