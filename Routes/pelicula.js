const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearPelicula, getPeliculas, actualizarPelicula, getPeliculaById, imagen, savePelicula } = require('../controllers/pelicula');

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');
const { upload, subirImagen } = require('../middlewares/multer');


router.get('/', getPeliculas);

router.get('/getById/:id', getPeliculaById);


router.post('/create',
    // upload.single('imagenPelicula'),
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

router.post('/crear', 
    subirImagen.single('imagenPelicula'),
    // [
    //     check('nombre','El nombre da la pelicula es obligatoria').not().isEmpty().trim(),
    //     check('director','El id dal director es obligatorio').not().isEmpty(),
    //     check('actores', 'El id de actores es obligatorio').not().isEmpty(),
    //     // check('actor', 'El id de actor es obligatorio').not().isEmpty(),
    //     check('anio', 'La fecha de estreno es oblgatoria').not().isEmpty(),
    //     check('generos', 'El id de genero es obligatorio').not().isEmpty(),
    // ], 
    // validarCampos,

    savePelicula)

router.post('/images/single', upload.single('imagenPelicula'), imagen)

module.exports = router;