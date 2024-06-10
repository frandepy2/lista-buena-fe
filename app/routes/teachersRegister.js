// routes/teachers.js
const express = require('express');
const router = express.Router();

// Importar el controlador de profesores
const { registerTeacher } = require('../controllers/teachersRegister');

// Ruta para registrar un profesor
router.post('/register', registerTeacher);

module.exports = router;
