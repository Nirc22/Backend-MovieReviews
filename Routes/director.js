const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { crearDirector, getDirectores, actualizarDirector, eliminarDirector } = require('../controllers/director');

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/get', getDirectores);

router.post('/create',
    [
        check('nombre','El nombre del actor es obligatorio').not().isEmpty(),
        check('apellido','El apellido del actor es obligatorio').not().isEmpty(),
    ], 
    validarCampos,
    validarJWT, 
    AdminRole, 
    crearDirector
);

router.put('/update/:id', 
    [
        check('nombre','El nombre del actor es obligatorio').not().isEmpty(),
        check('apellido','El apellido del actor es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actualizarDirector
);

router.delete('/delete/:id', validarJWT, AdminRole, eliminarDirector)

module.exports = router;