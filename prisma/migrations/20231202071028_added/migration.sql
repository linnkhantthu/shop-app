/*
  Warnings:

  - Added the required column `productName` to the `VoucherItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoucherItem" ADD COLUMN     "price" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "productName" TEXT NOT NULL;
