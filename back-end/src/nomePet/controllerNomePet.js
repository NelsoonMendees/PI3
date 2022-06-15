const pool = require('../../db');
const queries = require('./queriesNomePet')

const getPetPorNome = (req, res) => {
    pool.query(queries.getPetPorNome, (error, results) => {
        return res.status(200).json(results.rows);
    })
}

module.exports = {
    getPetPorNome,
}