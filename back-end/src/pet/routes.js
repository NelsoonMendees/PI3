const {Router} = require('express');
const controller = require('./controllerPet');

const router = Router();

// ROTAS CLIENTE 
router.get("/",  controller.getPet);
router.get("/:cpf", controller.getPetByCliente);
router.post("/", controller.addClienteEPet);
//router.put("/:cpf", controller.updateCliente);
//router.delete("/:cpf",controller.removeCliente);



module.exports = router;