-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TraderRole" AS ENUM ('SUPPLIER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "VoucherType" AS ENUM ('PURCHASE', 'PURCHASERETURN', 'SALE', 'SALERETURN');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('MyanmarKyat', 'Yuan', 'USDollar');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "dob" DATE NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trader" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phoneNo" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "role" "TraderRole" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Trader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'MyanmarKyat',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "voucherType" "VoucherType" NOT NULL,
    "traderId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherItem" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "voucherId" INTEGER NOT NULL,

    CONSTRAINT "VoucherItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "codeNo" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "purchasedCurrency" "Currency" DEFAULT 'MyanmarKyat',
    "transportationFees" DOUBLE PRECISION,
    "extraFees" DOUBLE PRECISION,
    "salesPercentage" DOUBLE PRECISION DEFAULT 10,
    "salesCurrency" "Currency" DEFAULT 'MyanmarKyat',
    "height" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "lenght" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trader_email_key" ON "Trader"("email");

-- AddForeignKey
ALTER TABLE "Trader" ADD CONSTRAINT "Trader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "Trader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherItem" ADD CONSTRAINT "VoucherItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherItem" ADD CONSTRAINT "VoucherItem_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
