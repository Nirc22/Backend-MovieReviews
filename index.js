const express = require('express')
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config')

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());


// app.use(cors({
//     origin: 'http://localhost:4200',  // Reemplaza esto con el origen correcto de tu aplicación Angular
//     methods: 'GET,POST',                // También puedes especificar los métodos HTTP permitidos
//     allowedHeaders: 'Content-Type,Authorization' // También puedes especificar los encabezados permitidos
//   }));

// app.use(cors('/api/usuario', require('./Routes/usuario')));

app.use('/api/rol', require('./Routes/rol'))
app.use('/api/usuario', require('./Routes/usuario'))
app.use('/api/actor', require('./Routes/actor'))
app.use('/api/director', require('./Routes/director'))
app.use('/api/genero',require('./Routes/genero'))
app.use('/api/pelicula',require('./Routes/pelicula'))
app.use('/api/usuarioReview', require('./Routes/usuarioReview'))


app.listen(process.env.Port, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.Port}`);
});

module.exports = app