const { response } = require('express');

const Pelicula = require('../models/Pelicula');
const Calificacion = require('../models/MovieReviews')

const getPeliculas = async(req, resp = response) => {
    try {
        const peliculas = await Pelicula.find().populate();
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

module.exports = { crearPelicula, getPeliculas}