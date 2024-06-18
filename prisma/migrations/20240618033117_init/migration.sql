/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Participante` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Participante" ALTER COLUMN "dni" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Participante_dni_key" ON "Participante"("dni");
