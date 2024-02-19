const { response } = require('express');

const UsuarioReview = require('../models/UsuarioReview');
const Pelicula = require('../models/Pelicula')

const getReviewsById = async (req, resp = response) => {
    try {
        
        const {id} = req.params;

        console.log(id);

        const listReviews = await UsuarioReview.find({"usuario": id});
        resp.status(200).json({
            ok: true,
            msg: 'Lista de reviews',
            listReviews
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar reviews del usuario',
        });
    }
}

const crearUsuarioReview = async (req, resp = response) => {
    try{
        usuarioReview = new UsuarioReview(req.body);      
        await usuarioReview.save();


        pelicula = new Pelicula();

        const {idPelicula} = req.body;

        const listPelicula = await Pelicula.findById(usuarioReview.pelicula);

        // const listPelicula = await Pelicula.find({"pelicula": idPelicula});

        console.log(usuarioReview.pelicula)
        console.log(listPelicula.calificacion.numReviews)



        // movieReviews = new Pelicula();
        

        // console.log(movieReviews.calificacion);
        // console.log(movieReviews);

        // const reviewActualizada = await MovieReviews.findByIdAndUpdate('65d1300176cb2513a645dde8', movieReviews.numReviews, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Review registrada correctamente',
            uid: usuarioReview.id,
            // review: reviewActualizada
        });
    }catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear la review'
        })
    }
}

module.exports = {
    crearUsuarioReview,
    getReviewsById
}

// const createReview = async(req, resp = response) => {
//     const usuarioId = req.params.id;

//     try {
//         const usuario = await Usuario.findById(usuarioId);

//         if(!usuario){
//             resp.status(400).json({
//                 ok:false,
//                 mgs: 'El id del usuario no coincide con ningun elemento de la BD'
//             });
//         }
//         const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, req.body, {new: true});
//         resp.status(200).json({
//             ok:true,
//             msg: 'Review creada',
//             review: usuarioActualizado
//         });
//     } catch (error) {
//         console.log(error);
//         resp.status(400).json({
//             ok: false,
//             msg: "Error al crear la review"
//         });
//     }
// }