// controllers/teachers.js
const db = require('../database/database');

// Controlador para registrar un profesor
const registerTeacher = async (req, res) => {
    const { name, dni, school } = req.body;

    // Verificar que se hayan enviado todos los campos necesarios
    if (!name || !dni || !school) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Insertar el profesor en la base de datos
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO teachers (name, dni, school) VALUES (?, ?, ?)', [name, dni, school], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

module.exports = { registerTeacher };
