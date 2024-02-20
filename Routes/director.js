const { Router } = require('express')
const router = Router();

const { crearDirector } = require('../controllers/director');

const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/create', validarJWT, AdminRole, crearDirector);

module.exports = router;