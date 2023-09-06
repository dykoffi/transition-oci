/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Coords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Performance` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Coords" DROP CONSTRAINT "Coords_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_actionId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Action_id_seq";

-- AlterTable
ALTER TABLE "Coords" DROP CONSTRAINT "Coords_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "actionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coords_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Coords_id_seq";

-- AlterTable
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "actionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Performance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Performance_id_seq";

-- AddForeignKey
ALTER TABLE "Coords" ADD CONSTRAINT "Coords_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
