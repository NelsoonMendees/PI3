const getAgendamentoById = "select * from pet inner join agendamento on pet.pet_id = agendamento.pet_id where agendamento_id = $1 ";
const updateAgendamento = "UPDATE agendamento SET horario=$1, data=$2, servicos=$3, pet_id=$4 WHERE agendamento_id =$5"
const getIdPetByNomePet = " select pet_id from cliente  inner join pet  on cliente.id_cliente = pet.id_cliente where nome_pet LIKE '%' || $1 || '%' ";
const deleteAgendamento = "delete from agendamento where agendamento_id = $1 ";
const getAgendamento = "select * from pet inner join agendamento on pet.pet_id = agendamento.pet_id";

module.exports = {
    getAgendamentoById,
    updateAgendamento,
    getIdPetByNomePet,
    deleteAgendamento,
    getAgendamento,
}