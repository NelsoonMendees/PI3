const { Router } = require('express');
const controllerLogin = require('./controllerLogin');

const router = Router();

router.post("/", controllerLogin.getUsuario);

module.exports = router;