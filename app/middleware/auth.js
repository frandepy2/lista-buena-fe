const jwt = require('jsonwebtoken');
const db = require('../database/database');

const authenticate = async (req, res, next) => {
    // Verificar si se proporciona un token en el encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Obtener el ID de usuario del token decodificado
        const userId = decoded.userId;

        // Verificar si el ID de usuario existe en la base de datos
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        // Si no se encuentra el usuario en la base de datos, devolver un error de autenticación
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Si el usuario existe, adjuntar el objeto de usuario a la solicitud y permitir que la solicitud continúe
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
