// app/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;