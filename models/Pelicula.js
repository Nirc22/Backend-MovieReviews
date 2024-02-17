const { Schema, model } = require('mongoose')

const PeliculaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    anio: {
        type: Date
    },
    genero: {
        type: String,
        required: true
    }

})

module.exports = model('pelicula', PeliculaSchema)