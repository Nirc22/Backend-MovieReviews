const { Router } = require('express');
const router = Router();

const { crearUsuarioReview, getReviewsUsuario, actualizarUsuarioReview, getReviewsUsuarioById } = require('../controllers/usuarioReview');

const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/getReviewsUsuario/:id', validarJWT, getReviewsUsuario)

router.post('/create', validarJWT, crearUsuarioReview);

router.get('/getReviewById/:id', validarJWT, getReviewsUsuarioById)

router.put('/updateReviewUsuario/:id', validarJWT,actualizarUsuarioReview)


module.exports = router;
