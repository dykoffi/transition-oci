/*
  Warnings:

  - A unique constraint covering the columns `[type_fichier]` on the table `Alerting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Opex` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Alerting_type_fichier_key" ON "Alerting"("type_fichier");

-- CreateIndex
CREATE UNIQUE INDEX "Opex_label_key" ON "Opex"("label");
