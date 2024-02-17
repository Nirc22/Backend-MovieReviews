const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
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
    collection: 'directores'
});

module.exports = model('director', DirectorSchema)
