const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const {crearGenero, getGeneros, actualizarGenero} = require('../controllers/genero');

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/get', getGeneros);

router.post('/create', 
    [
        check('nombre', 'El nombre del genero es obligatorio').not().isEmpty().trim(),
    ],
    validarCampos, 
    validarJWT, 
    AdminRole, 
    crearGenero
);

router.put('/update/:id', 
    [
        check('nombre', 'El nombre del genero es obligatorio').not().isEmpty().trim(),
    ],
    validarCampos, 
    validarJWT, 
    AdminRole, 
    actualizarGenero
);

module.exports = router;