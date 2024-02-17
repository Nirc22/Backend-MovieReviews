const { Schema, model } = require('mongoose');

const ActorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    }
},
{
    collection: 'actores'
});

module.exports = model('actor', ActorSchema)
