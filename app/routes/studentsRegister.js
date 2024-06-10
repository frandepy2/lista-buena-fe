const express = require('express');
const router = express.Router();

// Importar el controlador de estudiantes
const { registerStudent } = require('../controllers/studentsRegister');

// Ruta para registrar un estudiante
router.post('/register', registerStudent);

module.exports = router;
