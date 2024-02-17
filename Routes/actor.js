const { Router } = require('express')
const router = Router();

const { crearActor, getActores } = require('../controllers/actor');

router.get('/', getActores)

router.post('/create',crearActor);

module.exports = router;