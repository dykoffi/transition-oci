/*
  Warnings:

  - You are about to drop the column `fileNAme` on the `FileAction` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `FileAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `FileAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileAction" DROP COLUMN "fileNAme",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
