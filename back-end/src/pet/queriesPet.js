
const addCliente = "INSERT INTO cliente (cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ";
const getMaxCliente = "select max(id_cliente)  from cliente";
const getIdRacaByNomeRaca = " select raca_id  from raca where raca_pet LIKE ' || $1 || '%' ";
const addPet = "INSERT INTO pet (nome_pet, id_cliente, raca_id) VALUES ($1, $2, $3)";
const getPet = "SELECT * FROM pet";
const getIdClienteByCpf = "SELECT id_cliente FROM cliente WHERE cpf = $1";
const getPetByCliente = "select    raca_id, nome_pet from cliente c inner join pet p on c.$1= p.$1";




module.exports = {
    addCliente,
    getMaxCliente,
    getIdRacaByNomeRaca,
    addPet,
    getPet,
    getIdClienteByCpf,
    getPetByCliente
}