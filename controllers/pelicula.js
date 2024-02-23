const { response } = require('express');

const Pelicula = require('../models/Pelicula');
const Calificacion = require('../models/MovieReviews')

const getPeliculas = async(req, resp = response) => {
    try {
        const peliculas = await Pelicula.find().populate('director')
                                               .populate('actores.actor')
                                               .populate('generos.genero')
                                               .populate('calificacion');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de Peliculas',
            peliculas
        })
    } catch (error) {
        
    }
}

const crearPelicula = async (req, resp = response) => {
    try {
        calificacion = new Calificacion();

        pelicula = new Pelicula(req.body);

        calificacion.pelicula = pelicula.id;
        
        pelicula.calificacion = calificacion.id;
        await pelicula.save();
        await calificacion.save();


        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula registrada',
            uid: pelicula.id,
            calificacion: pelicula.calificacion
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al registrar pelicula'
        })
    }
}

const actualizarPelicula = async (req, resp = response) => {

    const peliculaId = req.params.id;

    try {
        
        const pelicula = await Pelicula.findById(peliculaId);

        if(!pelicula) {
            return resp.status(400).json({
                ok: false,
                msg: 'El id no corresponde a ninguna pelicula',
            });
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(peliculaId, req.body, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula actualizada de manera exitosa',
            rol: peliculaActualizada
        });


    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la pelicula',
        });
    }
}

const getPeliculaById = async (req, resp = response) => {
    try {
        const {id} = req.params;
        const pelicula = await Pelicula.findById(id);
        return resp.status(200).json({
            ok: true,
            msg: 'Pelicula',
            pelicula
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar Pelicula',
        });
    }
}

module.exports = { 
    crearPelicula, 
    getPeliculas,
    actualizarPelicula,
    getPeliculaById
}