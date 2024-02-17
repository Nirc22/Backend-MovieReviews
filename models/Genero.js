const { Schema, model } = require('mongoose')

const GeneroSchema = Schema({
    nombre:{
        type: String,
        required: true
    }
})

module.exports = model('genero', GeneroSchema)