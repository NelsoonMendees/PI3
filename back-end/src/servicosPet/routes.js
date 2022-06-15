const { Router } = require('express');
const controller = require('./controllerServicosPet');

const router = Router();

// ROTAS CLIENTE 
router.get("/", controller.getServicosPet);

module.exports = router;