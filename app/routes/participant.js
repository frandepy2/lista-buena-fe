// app/routes/studentsRegister.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); // Importa el middleware de autenticación
const studentController = require('../controllers/participant');

// Aplicar el middleware de autenticación a la ruta de registro de estudiantes
router.post('/register', authenticate, studentController.registerParticipant);
router.get("/get-datos", authenticate, studentController.getDatos);
router.get("/", authenticate, studentController.getStudentData);

module.exports = router;
