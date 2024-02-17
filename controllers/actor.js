const { response } = require('express');
const Actor = require('../models/Actor');

const getActores = async (req, resp = response) => {
    try {
        const actores = await Actor.find().populate('nombre');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de actores',
            actores
        })
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al listar actores',
        });
    }
}

const crearActor = async (req, resp = response) => {
    try{
        // const { nombre, apellido } = req.body;
        actor = new Actor(req.body);
        await actor.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Actor registrado correctamente',
            uid: actor.id,
            name: actor.nombre
        });
    }catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear Actor'
        })
    }
}

module.exports = {crearActor, getActores}