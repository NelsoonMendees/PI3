// queries CRUD CLIENTE
const getCliente = "SELECT * FROM CLIENTE C INNER JOIN PET P ON C.ID_CLIENTE = P.ID_CLIENTE";
const getClienteByCpf = "SELECT * FROM CLIENTE C INNER JOIN PET P ON C.ID_CLIENTE = P.ID_CLIENTE where cpf= $1 ";
const checkCpfExists = "SELECT cpf FROM cliente  WHERE cpf LIKE '%' || $1 || '%' ";
const addCliente = "INSERT INTO cliente (cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ";
const removeCliente = "DELETE FROM cliente WHERE cpf = $1";
const updateCliente = "UPDATE cliente SET nome= $1, telefone= $2, numero= $3, cidade= $4, bairro= $5, cep= $6, rua= $7, estado= $8, email= $9, complemento= $10 WHERE cpf = $11";
const updatePet = "UPDATE pet SET nome_pet = $1, raca_pet = $2 where pet_id = $3"


module.exports = {
    getCliente,
    getClienteByCpf,
    checkCpfExists,
    addCliente,
    removeCliente,
    updateCliente,
    updatePet,
};