const { Router } = require('express');
const router = Router();

const { crearPelicula, getPeliculas} = require('../controllers/pelicula');

router.get('/', getPeliculas);

router.post('/create', crearPelicula);

module.exports = router;