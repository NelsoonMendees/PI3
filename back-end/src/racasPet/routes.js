const { Router } = require('express');
const controller = require('./controllerRacasPet');

const router = Router();

// ROTAS CLIENTE 
router.get("/", controller.getPetRaca);

module.exports = router;