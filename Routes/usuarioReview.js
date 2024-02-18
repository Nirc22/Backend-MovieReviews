const { Router } = require('express');
const router = Router();

const { crearUsuarioReview, getReviewsById } = require('../controllers/usuarioReview');

router.get('/getById/:id', getReviewsById)

router.post('/create', crearUsuarioReview);

module.exports = router;
