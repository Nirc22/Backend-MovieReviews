const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        requird: true
    },
    apellidos: {
        type: String,
        requird: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'rol',
        required: true,
        default: '1'
    },
    movieReviews: {
        type: String,
    }
});

module.exports = model('usuario', UsuarioSchema)