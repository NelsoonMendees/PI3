const pool = require('../../db');
const queries = require('./queriesIdAgendamento');



const getAgendamento = (req, res) => {

    pool.query(queries.getAgendamento, (error, results) => {
        return res.status(200).json(results.rows);


    })
}


const getAgendamentoById = (req, res) => {

    const agendamento_id = parseInt(req.params.agendamento_id);

    pool.query(queries.getAgendamentoById, [agendamento_id], (error, results) => {

        if (results.rows.length === 0) {
            return res.status(422).json({ msg: 'não existem agendamentos para esse id ' })

        }
        else {


            return res.status(200).json(results.rows);
        }

    })

}


const updateAgendamento = (req, res) => {

    const agendamento_id = parseInt(req.params.agendamento_id);
    const { horario, data, servicos, nome_pet } = req.body;


    pool.query(queries.getIdPetByNomePet, [nome_pet], (error, results) => {

        const pet_id = results.rows[0].pet_id
        //return res.status(200).json(pet_id);


        pool.query(queries.updateAgendamento, [horario, data, servicos, pet_id, agendamento_id], (error, results) => {

            // return res.status(200).json(agendamento_id);

            return res.status(200).send("Agendamento atualizado com sucesso!");

        })

    })

}


const deleteAgendamento = (req, res) => {

    const agendamento_id = parseInt(req.params.agendamento_id);

    pool.query(queries.deleteAgendamento, [agendamento_id], (error, results) => {

        return res.status(200).json({ msg: 'Agendamento removido com sucesso. ' });

    })

}


module.exports = {
    updateAgendamento,
    getAgendamentoById,
    deleteAgendamento,
    getAgendamento,
}




