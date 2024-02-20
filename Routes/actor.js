const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { crearActor, getActores, actualizarActor, eliminarActor} = require('../controllers/actor');

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', getActores);

router.post('/create',
    [
        check('nombre','El nombre del actor es obligatorio').not().isEmpty(),
        check('apellido','El apellido del actor es obligatorio').not().isEmpty(),
    ],
    validarCampos, validarJWT, AdminRole, crearActor
);

router.put('/update/:id',
    [
        check('nombre','El nombre del actor es obligatorio').not().isEmpty(),
        check('apellido','El apellido del actor es obligatorio').not().isEmpty(),
    ],
    validarCampos, 
    validarJWT, 
    AdminRole, 
    actualizarActor
);

router.delete('/delete/:id',
    validarJWT, 
    AdminRole,
    eliminarActor 
);

module.exports = router;