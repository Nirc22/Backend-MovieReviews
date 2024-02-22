const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, getUsuarioById, getUsuarios, createReview, loginUsuario, actualizarUsuario, actualizarPassword } = require('../controllers/usuario');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/profile/:id',
    validarJWT,
    getUsuarioById
);

router.get('/getUsuarios', validarJWT, getUsuarios)

router.post(
    '/create',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
        check('apellidos', 'El apellido es obligatorio').not().isEmpty().trim(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    validarCampos,
    crearUsuario
);

router.post('/login', loginUsuario);

// router.put('/create/:id', createReview)

module.exports = router;