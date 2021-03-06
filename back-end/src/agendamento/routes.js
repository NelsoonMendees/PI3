const { Router } = require('express');
const controller = require('./controllerAgendamento');

const router = Router();

// ROTAS CLIENTE 
router.get("/", controller.getAgendamento);
router.get("/:data", controller.getAgendamentoByData);
router.post("/", controller.postAgendamento);
router.put("/:agendamento_id", controller.updateAgendamento);
router.delete("/:agendamento_id", controller.deleteAgendamento);


module.exports = router;