/*
  Warnings:

  - You are about to drop the column `altitudeAccuracy` on the `Coords` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Coords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coords" DROP COLUMN "altitudeAccuracy",
DROP COLUMN "heading",
ADD COLUMN     "bearing" DOUBLE PRECISION,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "time" TEXT;
