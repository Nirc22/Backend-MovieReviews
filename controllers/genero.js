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

const getGeneros = async (req, resp = response) => {
    try {
        const generos = await Genero.find().populate('nombre');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de generos',
            generos
        })
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar generos',
        });
    }
}

const actualizarGenero = async (req, resp = response) => {

    const generoId = req.params.id;

    try {
        
        const genero = await Genero.findById(generoId);

        if(!genero) {
            return resp.status(400).json({
                ok: false,
                msg: 'El id no corresponde a ningun genero',
            });
        }

        const generoActualizado = await Genero.findByIdAndUpdate(generoId, req.body, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Gnero actualizado de manera exitosa',
            rol: generoActualizado
        });


    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el genero',
        });
    }
}

module.exports = { 
    crearGenero,
    getGeneros,
    actualizarGenero
}