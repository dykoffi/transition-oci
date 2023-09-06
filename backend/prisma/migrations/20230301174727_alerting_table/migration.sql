-- CreateEnum
CREATE TYPE "TypeFichier" AS ENUM ('BASE_SITES', 'OPEX_OCI', 'OPEX_ESCO', 'OPEX_IHS', 'CA_SITES', 'PARC_SITES', 'ACTION_COM', 'ACTION_TECH');

-- CreateTable
CREATE TABLE "Alerting" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type_fichier" "TypeFichier" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerting_pkey" PRIMARY KEY ("id")
);
