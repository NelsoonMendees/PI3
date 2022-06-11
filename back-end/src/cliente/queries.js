


// queries CRUD CLIENTE
const getCliente = "SELECT * FROM cliente";
const getClienteByCpf = "SELECT * FROM cliente where cpf= $1 ";
const checkCpfExists = "SELECT cpf FROM cliente  WHERE cpf LIKE '%' || $1 || '%' ";
const addCliente = "INSERT INTO cliente (cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ";
const removeCliente = "DELETE FROM cliente WHERE cpf = $1";
const updateCliente = "UPDATE cliente SET nome= $1, telefone= $2, numero= $3, cidade= $4, bairro= $5, cep= $6, rua= $7, estado= $8, email= $9, complemento= $10 WHERE cpf = $11";




module.exports = {
    getCliente,
    getClienteByCpf,
    checkCpfExists,
    addCliente,
    removeCliente,
    updateCliente,
    
};