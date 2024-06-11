// routes/teachersRegister.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const teachersRegisterController = require('../controllers/teachersRegister');

// Aplicar el middleware de autenticación a la ruta de registro de profesores
router.post('/register', authenticate, teachersRegisterController.registerTeacher);

module.exports = router;

