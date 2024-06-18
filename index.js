// index.js
const express = require('express');
const cookieParser = require('cookie-parser'); // Importar el middleware de cookies
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cookieParser()); // Usar el middleware de cookies

app.get('/',(req,res)=>{
    res.send('hola mundo');
});
app.use('/auth', require('./app/routes/auth.js'));
app.use('/students', require('./app/routes/studentsRegister.js'));
app.use('/teachers', require('./app/routes/teachersRegister.js'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
