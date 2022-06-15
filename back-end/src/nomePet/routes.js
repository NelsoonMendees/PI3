const { Router } = require('express');
const controller = require('./controllerNomePet');

const router = Router();

// ROTAS CLIENTE 
router.get("/", controller.getPetPorNome);

module.exports = router;