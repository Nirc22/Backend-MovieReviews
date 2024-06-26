const { response } = require('express');

const UsuarioReview = require('../models/UsuarioReview');
const Calificacion = require('../models/MovieReviews')
const Pelicula = require('../models/Pelicula');

const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerIdUsuarioDesdeToken } = require('../helpers/generar-jwt')



// const Pelicula = require('../models/Pelicula')

const getReviewsUsuario = async (req, resp = response) => {
    try {

        const { id } = req.params;

        // console.log(id);

        const listReviews = await UsuarioReview.find({ "usuario": id }).populate('pelicula');
        return resp.status(200).json({
            ok: true,
            msg: 'Lista de reviews',
            listReviews
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'error al listar reviews del usuario',
        });
    }
}

const crearMovieReview = async (pelicula, calificacion) => {
    
    const listPelicula = await Calificacion.find({ "pelicula": pelicula });
    const peli = listPelicula[0];
    const review = peli.numReviews + 1;
    const suma = peli.sumReviews + calificacion;
    const promedio = peli.calificacion = suma / review;
    const movieReviewActualizado = await Calificacion.findByIdAndUpdate(peli.id,
        { numReviews: review, sumReviews: suma, calificacion: promedio }, { new: true });
}

const crearUsuarioReview = async (req, resp = response) => {
    try {
        usuarioReview = new UsuarioReview(req.body);
        const { usuario, pelicula, calificacion } = req.body;
        const movie = await UsuarioReview.find({"pelicula": pelicula, "usuario": usuario });
        if(movie.length === 0){
            console.log(movie)
            crearMovieReview(pelicula, calificacion)
            await usuarioReview.save();
            return resp.status(200).json({
                ok: true,
                msg: 'Review registrada correctamente',
                review: usuarioReview
                // review: reviewActualizada
            });
        }else{
            return resp.status(400).json({
                ok: false,
                msg: 'No se puede, usuario ya tiene review para esta pelicula',
                // review: reviewActualizada
            });
        }
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear la review'
        })
    }
}

const actualizarMovieReview = async (pelicula, nuevaCalificacion) => {
    
    const listPelicula = await Calificacion.find({ "pelicula": pelicula });
    const peli = listPelicula[0];
    const review = peli.numReviews;
    const suma = peli.sumReviews + nuevaCalificacion;
    const promedio = peli.calificacion = suma / review;
    await Calificacion.findByIdAndUpdate(peli.id,
        {  sumReviews: suma, calificacion: promedio }, { new: true });
}

const actualizarUsuarioReview = async (req, resp = response) =>{
    try {
        const {id} = req.params;
        const { usuario, pelicula, calificacion } = req.body;
        const review = await UsuarioReview.findById(id);
        const vCalificacion = review.calificacion;

        const listPelicula = await Calificacion.find({ "pelicula": pelicula });
        const peli = listPelicula[0];
        const suma = peli.sumReviews - vCalificacion;

        await Calificacion.findByIdAndUpdate(peli.id,
            { sumReviews: suma }, { new: true });

        actualizarMovieReview(pelicula, calificacion)

        const reviewUpdate = await UsuarioReview.findByIdAndUpdate(id, 
            { calificacion: calificacion }, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Review actualizada',
            review: reviewUpdate
        });
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la review'
        })
    }

}

const getReviewsUsuarioById = async (req, resp = response) =>{
    try {
        const {id} = req.params;
        const review = await UsuarioReview.findById(id).populate('pelicula');
        return resp.status(200).json({
            ok: true,
            msg: 'Review',
            review
        });
        
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al listar Review',
        });
    }
}

const getReviewPeliculaByNombre = async (req, resp= response) => {
    try {
        const {nombre} = req.params;
        token = req.headers['x-access-token'] || req.headers['authorization'];

        console.log(nombre)
        const peliculas = await Pelicula.find({ "nombre": { $regex: new RegExp(nombre, "i") } });        
        if (peliculas.length === 0) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontraron películas con ese nombre',
            });
        }

        // const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado Authorization
        // console.log("Token",token);

        const usuarioId = await obtenerIdUsuarioDesdeToken(token);
        // const usuario = await validarJWT(token);
        console.log("ID", usuarioId);
        // const usuarioId = await obtenerIdUsuarioDesdeToken()
        // console.log(peliculas[0]._id)
        const reviews = await UsuarioReview.find({ "pelicula": peliculas[0]._id, "usuario": usuarioId } );
        if(reviews.length === 0){
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontraron reviews del usuario',
            });
        }
        return resp.status(200).json({
            ok: true,
            msg: 'Reviews por nombre',
            reviews
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al buscar peliculas',
        });
        
    }
}


module.exports = {
    crearUsuarioReview,
    getReviewsUsuario,
    actualizarUsuarioReview,
    getReviewsUsuarioById,
    getReviewPeliculaByNombre
}