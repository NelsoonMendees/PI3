const {Router} = require('express');
const controllerLogin = require('./controllerLogin');

const router = Router();

router.post("/", controllerLogin.getUsuario);

//router.get("/:senha,", controllerLogin.getUsuarioBySenha);

module.exports = router;