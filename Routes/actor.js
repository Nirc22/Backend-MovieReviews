const { Router } = require('express')
const router = Router();

const { crearActor, getActores } = require('../controllers/actor');

const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', getActores)

router.post('/create', validarJWT, AdminRole, crearActor);

module.exports = router;