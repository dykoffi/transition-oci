/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `SeuilOpex` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SeuilOpex_code_key" ON "SeuilOpex"("code");
