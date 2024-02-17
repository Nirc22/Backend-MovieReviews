const { response } = require('express');

const Pelicua = require('../models/Pelicula');
const Calificacion = require('../models/MovieReviews')

const crearPelicula = async (req, resp = response) => {
    try {
        calificacion = new Calificacion();
        await calificacion.save();

        pelicula = new Pelicua(req.body);
        pelicula.calificacion = calificacion.id
        await pelicula.save();

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

module.exports = { crearPelicula}