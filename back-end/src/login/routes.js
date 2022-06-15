const { Router } = require('express');
const controllerLogin = require('./controllerLogin');

const router = Router();

router.get("/", controllerLogin.getUsuario);

module.exports = router;