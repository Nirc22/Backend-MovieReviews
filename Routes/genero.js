const { Router } = require('express');
const router = Router();

const {crearGenero} = require('../controllers/genero');

const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/create', validarJWT, AdminRole, crearGenero);

module.exports = router;