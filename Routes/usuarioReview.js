const { Router } = require('express');
const router = Router();

const { crearUsuarioReview, getReviewsUsuario, actualizarUsuarioReview } = require('../controllers/usuarioReview');

const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/getReviewsUsuario/:id', validarJWT, getReviewsUsuario)

router.post('/create', validarJWT, crearUsuarioReview);

router.get('/updateReviewUsuario/:id', actualizarUsuarioReview)


module.exports = router;
