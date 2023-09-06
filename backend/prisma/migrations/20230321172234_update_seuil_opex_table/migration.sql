/*
  Warnings:

  - You are about to drop the column `type` on the `SeuilOpex` table. All the data in the column will be lost.
  - Added the required column `code` to the `SeuilOpex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeuilOpex" DROP COLUMN "type",
ADD COLUMN     "code" TEXT NOT NULL;
