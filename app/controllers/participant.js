// Controlador para registrar un estudiante
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerParticipant = async (req, res) => {
    console.log("llegue aca");
    const { name, dni, type, gamemode, school } = req.body;

    console.log(name, dni, type, gamemode, school);

    // Verificar que se hayan enviado todos los campos necesarios
    if (!name || !dni || !type || !school || !gamemode) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //parsea type a entero
    var typeInt = Number.parseInt(type);
    var schoolInt = Number.parseInt(school);

    try {
        // Verificar si el estudiante ya está registrado por el DNI
        const existingStudent = await prisma.participante.findUnique({
            where: { dni: dni },
            include: { modalidades: true },
        })

        if (existingStudent) {
            //Actualizamos la modalidad
            const updateParticipante = await prisma.participante.update({
                where: { dni: dni },
                data: {
                    modalidades: {
                        connect: gamemode.map((modalidadId) => ({ id: modalidadId })),
                    }
                }
            })
            return res.status(200).json(updateParticipante);
        }

        const nuevoParticipante = await prisma.participante.create({
            data: {
                nombre: name,
                dni: dni,
                tipo: {
                    connect: { id: typeInt },
                },
                colegio: {
                    connect: { id: schoolInt },
                },
                modalidades: {
                    connect: gamemode.map((modalidadId) => ({ id: modalidadId })),
                },
            },
        });

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

const getDatos = async (req, res) => {
    try {
        const [colegios, tipos, modalidades] = await Promise.all([
            prisma.colegio.findMany(),
            prisma.tipo.findMany(),
            prisma.modalidad.findMany(),
        ]);

        res.status(200).json({ colegios, tipos, modalidades });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos' });
    }
}

const getStudentData = async (req, res) => {
    const {dni} = req.query;
    try {
        const participante = await prisma.participante.findUnique({
            where: { dni: dni },
            include: {
                tipo: true,
                colegio: true,
                modalidades: true
            },
        });

        if (!participante) {
            return res.status(404).json({ error: 'Participante no encontrado' });
        }

        res.status(200).json(participante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener el participante' });
    }
}

module.exports = { registerParticipant, getDatos,getStudentData };