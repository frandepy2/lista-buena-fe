// index.js
const express = require('express');
const cookieParser = require('cookie-parser'); // Importar el middleware de cookies
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cookieParser()); // Usar el middleware de cookies
app.use(cors(
    {  origin: '*', // Permitir cualquier dominio
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir estos métodos
        allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
    }
));

app.get('/',(req,res)=>{
    res.send('hola mundo');
});
app.use('/auth', require('./app/routes/auth.js'));
app.use('/students', require('./app/routes/participant.js'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
