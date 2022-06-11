const getIdServicoByServico = " select servico_id from servicos where servicos_pet   LIKE '' || $1 || '%' ";
const getIdPetByNomePet = " select pet_id from cliente  inner join pet  on cliente.id_cliente = pet.id_cliente where nome_pet LIKE '%' || $1 || '%' ";
const addAgendamento = " insert into agendamento (horario, data, servico_id, pet_id) values ($1 ,$2, $3, $4)";
const getAgendamentoById = "select * from agendamento where agendamento_id = $1 ";
const getMaxAgendamentoId = "select max(agendamento_id) from agendamento";

const getAgendamento = "select * from agendamento";

const deleteAgendamento = "delete from agendamento where agendamento_id = $1 ";

const updateAgendamento =  "UPDATE agendamento SET horario=$1, data=$2, servico_id=$3, pet_id=$4 WHERE agendamento_id =$5"




module.exports = {
    getIdServicoByServico,
    getIdPetByNomePet,
    addAgendamento,
    getAgendamentoById,
    getMaxAgendamentoId,
    getAgendamento,
    deleteAgendamento,
    updateAgendamento,
}