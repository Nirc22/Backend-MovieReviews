const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearPelicula, getPeliculas, actualizarPelicula } = require('../controllers/pelicula');

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', getPeliculas);

router.post('/create',
    [
        check('nombre','El nombre da la pelicula es obligatoria').not().isEmpty().trim(),
        check('director','El id dal director es obligatorio').not().isEmpty(),
        check('actores', 'El id de actores es obligatorio').not().isEmpty(),
        // check('actor', 'El id de actor es obligatorio').not().isEmpty(),
        check('anio', 'La fecha de estreno es oblgatoria').not().isEmpty(),
        check('generos', 'El id de genero es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT, 
    AdminRole, 
    crearPelicula
);

router.put('/update/:id',
    [
        check('nombre','El nombre da la pelicula es obligatoria').not().isEmpty().trim(),
        check('director','El id dal director es obligatorio').not().isEmpty(),
        check('actores', 'El id de actores es obligatorio').not().isEmpty(),
        // check('actor', 'El id de actor es obligatorio').not().isEmpty(),
        check('anio', 'La fecha de estreno es oblgatoria').not().isEmpty(),
        check('generos', 'El id de genero es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT, 
    AdminRole, 
    actualizarPelicula
);

module.exports = router;