const { Router } = require('express')
const router = Router();

const { crearDirector } = require('../controllers/director');

router.post('/create',crearDirector);

module.exports = router;