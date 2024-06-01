const express = require('express');

const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/auth', require('./app/routes/auth'));

app.use('/students', require('./app/routes/students.js'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});




