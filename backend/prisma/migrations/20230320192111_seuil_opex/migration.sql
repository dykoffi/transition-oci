-- CreateEnum
CREATE TYPE "TypeMarge" AS ENUM ('MARGE_CA', 'MARGE_OPEX');

-- CreateTable
CREATE TABLE "SeuilOpex" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "TypeMarge" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SeuilOpex_pkey" PRIMARY KEY ("id")
);
