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

const getDirectores = async (req, resp = response) => {
    try {
        const directores = await Director.find().populate('nombre');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de directores',
            directores
        })
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar directores',
        });
    }
}

const actualizarDirector = async (req, resp = response) => {

    const directorId = req.params.id;

    try {
        
        const director = await Director.findById(directorId);

        if(!director) {
            return resp.status(400).json({
                ok: false,
                msg: 'El id no corresponde a ningun director',
            });
        }

        const directorActualizado = await Director.findByIdAndUpdate(directorId, req.body, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Director actualizado de manera exitosa',
            rol: directorActualizado
        });


    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el director',
        });
    }
}

const eliminarDirector = async (req, resp = response) => {
    const directorId = req.params.id;

    try {
        const director = await Director.findById(directorId);

        if(!director){
            return resp.status(404).json({
                ok: false,
                msg: 'El id no corresponde a ningun director',
            });
        }
        await Director.findByIdAndDelete(directorId);

        return resp.status(200).json({
            ok: true,
            msg: 'Director eliminado'
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: "Error al eliminar el director"
        });
    }
}

module.exports = {
    crearDirector,
    getDirectores,
    actualizarDirector,
    eliminarDirector
}