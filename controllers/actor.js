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

const actualizarActor = async (req, resp = response) => {

    const actorId = req.params.id;

    try {
        
        const actor = await Actor.findById(actorId);

        if(!actor) {
            resp.status(201).json({
                ok: false,
                msg: 'El id del actor no coincide con ningun elemento en la base de datos',
            });
        }

        const actorActualizado = await Actor.findByIdAndUpdate(actorId, req.body, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'Actor actualizado de manera exitosa',
            rol: actorActualizado
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el actor',
        });
    }
}

module.exports = {
    crearActor, 
    getActores,
    actualizarActor
}