const { Router } = require('express');
const router = Router();

const { crearUsuarioReview, getReviewsById } = require('../controllers/usuarioReview');

const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/getById/:id', validarJWT, getReviewsById)

router.post('/create', validarJWT, crearUsuarioReview);

module.exports = router;
