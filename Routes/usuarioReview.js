const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { isInt } = require('validator');


const { crearUsuarioReview, getReviewsUsuario, actualizarUsuarioReview, getReviewsUsuarioById } = require('../controllers/usuarioReview');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');



router.get('/getReviewsUsuario/:id', validarJWT, getReviewsUsuario)

router.post(
    '/create',
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty().trim(),
        check('pelicula', 'La pelicula es obligatoria').not().isEmpty().trim(),
        check('calificacion', 'La calificación debe estar entre 0 y 5').custom((value) => {
            const rating = parseFloat(value);
            if (isNaN(rating) || rating < 0 || rating > 5) {
                throw new Error('La calificación debe estar entre 0 y 5');
            }
            return true;
        }),
    ],
    validarCampos, validarJWT, crearUsuarioReview);

router.get('/getReviewById/:id', validarJWT, getReviewsUsuarioById)

router.put('/updateReviewUsuario/:id', validarJWT, actualizarUsuarioReview)


module.exports = router;
