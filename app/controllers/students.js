const db = require('../database/database');

// Controlador para registrar un estudiante
const registerStudent = async (req, res) => {
    const { name, dni, birthday, gamemode, school } = req.body;

    // Verificar que se hayan enviado todos los campos necesarios
    if (!name || !dni || !birthday || !gamemode || !school) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Verificar si el estudiante ya está registrado por el DNI
        const existingStudent = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM students WHERE dni = ?', [dni], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (existingStudent) {
            return res.status(400).json({ message: 'Student with the same DNI already exists' });
        }

        // Insertar el estudiante en la base de datos
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO students (name, dni, birthday, gamemode, school) VALUES (?, ?, ?, ?, ?)', [name, dni, birthday, gamemode, school], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

module.exports = { registerStudent };