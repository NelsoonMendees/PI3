const getIdServicoByServico = " select servico_id from servicos where servicos_pet   LIKE '' || $1 || '%' ";
const getIdPetByNomePet = " select pet_id from cliente  inner join pet  on cliente.id_cliente = pet.id_cliente where nome_pet LIKE '%' || $1 || '%' ";
const addAgendamento = " insert into agendamento (horario, data, servicos, pet_id) values ($1 ,$2, $3, $4)";
const getAgendamentoById = "select * from agendamento where agendamento_id = $1 ";
const getMaxAgendamentoId = "select max(agendamento_id) from agendamento";
const getAgendamento = "select * from pet inner join agendamento on pet.pet_id = agendamento.pet_id";
const deleteAgendamento = "delete from agendamento where agendamento_id = $1 ";
const updateAgendamento = "UPDATE agendamento SET horario=$1, data=$2, servicos=$3, pet_id=$4 WHERE agendamento_id =$5"
const getAgendamentoByData = "select * from pet inner join agendamento on pet.pet_id = agendamento.pet_id where data  = $1 ";

module.exports = {
    getIdServicoByServico,
    getIdPetByNomePet,
    addAgendamento,
    getAgendamentoById,
    getMaxAgendamentoId,
    getAgendamento,
    deleteAgendamento,
    updateAgendamento,
    getAgendamentoByData,
}