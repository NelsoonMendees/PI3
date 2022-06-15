const pool = require('../../db');
const queries = require('./queriesServicosPet')

const getServicosPet = (req, res) => {

    pool.query(queries.getServicosPet, (error, results) => {

        res.status(200).json(results.rows);
    })
}


module.exports = {
    getServicosPet
}