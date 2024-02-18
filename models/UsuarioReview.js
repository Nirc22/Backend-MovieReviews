const { Schema, model } = require('mongoose');

const UsuarioReviewSchema = Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        required: true
    },
    pelicula: {
        type: Schema.Types.ObjectId,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    }
})

module.exports = model('usuarioReview', UsuarioReviewSchema)