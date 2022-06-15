const { Router } = require('express');
const controller = require('./controllerIdAgendamentol');


const router = Router();

// ROTAS CLIENTE 
router.get("/", controller.getAgendamento);
router.get("/:agendamento_id", controller.getAgendamentoById);

router.put("/:agendamento_id", controller.updateAgendamento);
router.delete("/:agendamento_id", controller.deleteAgendamento);



module.exports = router;