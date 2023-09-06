-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "date_deb" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "localite" TEXT NOT NULL,
    "nb_rh" TEXT NOT NULL,
    "new_quartier" TEXT,
    "nom_action" TEXT NOT NULL,
    "partners" TEXT NOT NULL,
    "perimetre" TEXT NOT NULL,
    "quartier" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "ville" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coords" (
    "id" SERIAL NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "altitudeAccuracy" DOUBLE PRECISION NOT NULL,
    "heading" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "actionId" INTEGER NOT NULL,

    CONSTRAINT "Coords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "actionId" INTEGER NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coords_actionId_key" ON "Coords"("actionId");

-- AddForeignKey
ALTER TABLE "Coords" ADD CONSTRAINT "Coords_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
