/*
  Warnings:

  - Added the required column `colegioId` to the `Participante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participante" ADD COLUMN     "colegioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_colegioId_fkey" FOREIGN KEY ("colegioId") REFERENCES "Colegio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
