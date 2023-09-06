/*
  Warnings:

  - You are about to drop the `Opex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeuilOpex` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Opex";

-- DropTable
DROP TABLE "SeuilOpex";

-- CreateTable
CREATE TABLE "parametre" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parametre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parametre_code_key" ON "parametre"("code");
