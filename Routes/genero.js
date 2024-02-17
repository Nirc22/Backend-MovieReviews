const { Router } = require('express');
const router = Router();

const {crearGenero} = require('../controllers/genero');

router.post('/create', crearGenero);

module.exports = router;