/*
  Warnings:

  - Made the column `email` on table `Trader` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Trader` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNo` on table `Trader` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trader" DROP CONSTRAINT "Trader_userId_fkey";

-- AlterTable
ALTER TABLE "Trader" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phoneNo" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trader" ADD CONSTRAINT "Trader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
