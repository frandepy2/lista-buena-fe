const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); // Importa el middleware de autenticación
const studentsRegisterController = require('../controllers/studentsRegister');

// Aplicar el middleware de autenticación a la ruta de registro de estudiantes
router.post('/register', authenticate, studentsRegisterController.registerStudent);

module.exports = router;
