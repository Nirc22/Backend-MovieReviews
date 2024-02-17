const { Router } = require('express');
const router = Router();

const { crearPelicula} = require('../controllers/pelicula');

router.post('/create', crearPelicula);

module.exports = router;