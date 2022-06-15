const pool = require('../../db');
const queries = require('./queriesPet')

const getPet = (req, res) => {
    pool.query(queries.getPet, (error, result) => {
        res.status(200).json(result.rows);
    })
}

const getPetByCliente = (req, res) => {
    const cpf = req.params.cpf.toString();

    pool.query(queries.getIdClienteByCpf, [cpf], (error, results) => {
        const id_cliente = results.rows[0].id_cliente

        pool.query(queries.getPetByCliente, [id_cliente], (error, results) => {
            return res.status(200).json(results);
        })
    })
}


const addClienteEPet = (req, res) => {
    const { cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento, nome_pet, raca_pet } = req.body;
    if (!nome) {
        return res.status(422).json({ msg: 'insira um nome' })
    }
    if (!cpf) {
        return res.status(422).json({ msg: 'insira um cpf' })
    }
    if (!telefone) {
        return res.status(422).json({ msg: 'insira um telefone' })
    }

    pool.query(queries.checkCpfExists, [cpf], (error, results, next) => {
        if (results.rows.length) {
            return res.status(422).json({ msg: 'cpf ja existe ' })
        }
        else {
            // add cliente to db
            pool.query(queries.addCliente, [cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento], (error, results) => {

                pool.query(queries.getMaxCliente, (error, results) => {
                    const id_cliente = results.rows[0].max
                    // return res.status(200).json(id_cliente);
                    pool.query(queries.addPet, [nome_pet, id_cliente, raca_pet], (error, results) => {
                        return res.status(201).json({ msg: 'cliente e pet salvos com sucesso ' })
                    })
                })
            })
        }
    })
}


const addPet = (req, res) => {

    pool.query(queries.addPet, (error, result) => {
    })
}

const updatePet = (req, res) => {
    pool.query(queries.updatePet, (error, result) => {
    })
}

const deletePet = (req, res) => {
    pool.query(queries.deletePet, (error, result) => {
    })
}

module.exports = {
    addClienteEPet,
    addPet,
    getPet,
    getPetByCliente,
}