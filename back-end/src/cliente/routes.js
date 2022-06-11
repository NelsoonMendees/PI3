const {Router} = require('express');
const controller = require('./controller');


const router = Router();

// ROTAS CLIENTE 
router.get("/",  controller.getCliente);
router.get("/:cpf", controller.getClienteByCpf);
router.post("/", controller.addCliente);
router.put("/:cpf", controller.updateCliente);
router.delete("/:cpf",controller.removeCliente);



module.exports = router;