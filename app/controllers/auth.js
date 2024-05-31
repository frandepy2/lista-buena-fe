const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/database');


const register = async (req, res) => {
    const { username, password, superuser } = req.body;

    // Verificar que se hayan enviado los datos necesarios
    if (!username || !password || superuser === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Verificar si el usuario ya existe
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (row) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Verifica que superuser sea un booleano
        if (typeof superuser !== 'boolean') {
            return res.status(400).json({ message: 'superuser must be a boolean' });
        }
        
        // Guardar el usuario
        db.run('INSERT INTO users (username, password, superuser) VALUES (?, ?, ?)', [username, hashedPassword, superuser], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

module.exports = { register };