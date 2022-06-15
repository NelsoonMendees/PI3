const pool = require('../../db');
const queries = require('./queriesRacasPet');


const getPetRaca = (req, res) => {
    pool.query(queries.getPetRaca, (error, result) => {
        res.status(200).json(result.rows);
    })
}

module.exports = {
    getPetRaca,
}