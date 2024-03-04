const { Schema, model } = require('mongoose')

const PeliculaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    director:{
        type: Schema.Types.ObjectId,
        ref: 'director',
        required: true
    },
    actores:[{
        actor:{
            type: Schema.Types.ObjectId,
            ref: 'actor',
            required: true
        }
    }],
    anio: {
        type: Date,
    },
    generos: [{
        genero: {
            type: Schema.Types.ObjectId,
            ref: 'genero',
            required: true
        }
    }],
    calificacion: {
        type: Schema.Types.ObjectId,
        ref: 'movieReview',
    },
    imagenPelicula:{
        type: String,
        // required: true,
        default: './uploads/SinImagen.jpg'
    }
    
})

module.exports = model('pelicula', PeliculaSchema)