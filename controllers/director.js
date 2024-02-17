const { response } = require('express');
const Director = require('../models/Director');

const crearDirector = async (req, resp = response) => {
    try{
        // const { nombre, apellido } = req.body;
        director = new Director(req.body);
        await director.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Director registrado correctamente',
            uid: director.id,
            name: director.nombre
        });
    }catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear Director'
        })
    }
}

module.exports = {crearDirector}