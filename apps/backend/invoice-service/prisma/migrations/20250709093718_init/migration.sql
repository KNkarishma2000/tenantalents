/*
  Warnings:

  - Added the required column `fileUrl` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "serId" TEXT NOT NULL;
