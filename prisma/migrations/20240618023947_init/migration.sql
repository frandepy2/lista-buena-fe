-- CreateTable
CREATE TABLE "Modalidad" (
    "id" SERIAL NOT NULL,
    "modalidad" TEXT NOT NULL,

    CONSTRAINT "Modalidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colegio" (
    "id" SERIAL NOT NULL,
    "colegio" TEXT NOT NULL,

    CONSTRAINT "Colegio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipanteModalidades" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Modalidad_modalidad_key" ON "Modalidad"("modalidad");

-- CreateIndex
CREATE UNIQUE INDEX "Colegio_colegio_key" ON "Colegio"("colegio");

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_tipo_key" ON "Tipo"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipanteModalidades_AB_unique" ON "_ParticipanteModalidades"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipanteModalidades_B_index" ON "_ParticipanteModalidades"("B");

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipanteModalidades" ADD CONSTRAINT "_ParticipanteModalidades_A_fkey" FOREIGN KEY ("A") REFERENCES "Modalidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipanteModalidades" ADD CONSTRAINT "_ParticipanteModalidades_B_fkey" FOREIGN KEY ("B") REFERENCES "Participante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
