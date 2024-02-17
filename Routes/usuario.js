const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, getUsuarioById, loginUsuario, actualizarUsuario, actualizarPassword } = require('../controllers/usuario');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/profile/:id',
    // validarJWT,
    getUsuarioById
);

router.post(
    '/create',
    [
        check('nombre', 'EL nombre es obligatorio').not().isEmpty().trim(),
        check('apellidos', 'EL apellido es obligatorio').not().isEmpty().trim(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    // validarCampos,
    crearUsuario
);




module.exports = router;