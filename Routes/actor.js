const { Router } = require('express')
const router = Router();

const { crearActor } = require('../controllers/actor');

router.post('/create',crearActor);

module.exports = router;