// app/controllers/auth.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { username, password, superuser } = req.body;

    // Verificar que se hayan enviado los datos necesarios
    if (!username || !password || superuser === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Verificar si el usuario ya existe
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verifica que superuser sea un booleano
        if (typeof superuser !== 'boolean') {
            return res.status(400).json({ message: 'superuser must be a boolean' });
        }

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                superuser: superuser,
            }
        })

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por su nombre de usuario
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        // Verificar si el usuario existe y si la contraseña coincide
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Crear un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);

        // Configurar una cookie con el token JWT
        res.cookie('token', token, { httpOnly: true });

        // Enviar el token JWT junto con un mensaje de éxito como respuesta
        res.status(200).json({ message: 'Login successful', token:token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = { register, login };
