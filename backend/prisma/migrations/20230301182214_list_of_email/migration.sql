/*
  Warnings:

  - The `email` column on the `Alerting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Alerting" DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];
