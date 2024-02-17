const { response } = require('express');
const Genero = require('../models/Genero');

const crearGenero = async (req, resp) => {

    const genero = new Genero(req.body);

    try {
        const generoSave = await genero.save();
        resp.status(201).json({
            ok: true,
            msg: 'Genero creado de manera exitosa',
            name: generoSave.nombre,
            // generoSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al crear el genero',
        });
    }
}

module.exports = { crearGenero}