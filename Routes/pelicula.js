const { Router } = require('express');
const router = Router();

const { crearPelicula, getPeliculas} = require('../controllers/pelicula');

const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', getPeliculas);

router.post('/create', validarJWT, AdminRole, crearPelicula);

module.exports = router;