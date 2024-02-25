const express = require('express')
const cors = require('cors');
require('dotenv').config();
const {path, join} = require('path');

// const multer = require('multer');

// const upload = multer({dest: 'uploads/'});

const {dbConnection} = require('./database/config')

const app = express();

// app.post('/images/single', upload.single('imagenPelicula'), (req, res) =>{
//     console.log(req.file);
//     res.send('Termina')
// })

dbConnection();

app.use(cors());

app.use(express.json());


// const directorioUploads = path.join(__dirname, 'uploads');

// Configura express.static() para servir archivos estáticos desde 'uploads'
// app.use('/uploads', express.static(directorioUploads));

app.use('/uploads', express.static(join(__dirname, 'uploads')));


// app.use(express.static('public'))//para poder acceder al directorio uploads

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