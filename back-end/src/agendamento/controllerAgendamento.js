const pool = require('../../db');
const queries = require('./queriesAgendamento')




const getAgendamento = (req, res) => {

    pool.query(queries.getAgendamento, (error, results) => {
        res.status(200).json(results.rows);

    })
}


const getAgendamentoById = (req, res) => {

    const agendamento_id = parseInt(req.params.agendamento_id);

    pool.query(queries.getAgendamentoById, [agendamento_id], (error, results) => {

        return res.status(200).json(results.rows);


    })

}




const postAgendamento = (req, res) => {

    const { data, horario, servicos_pet, nome_pet } = req.body;


    pool.query(queries.getIdServicoByServico, [servicos_pet], (error, results) => {

        const servico_id = results.rows[0].servico_id


        //return res.status(200).json(servico_id);

        pool.query(queries.getIdPetByNomePet, [nome_pet], (error, results) => {

            const pet_id = results.rows[0].pet_id

            //return res.status(200).json(pet_id);

            pool.query(queries.addAgendamento, [horario, data, servico_id, pet_id], (error, results) => {
                //console.log(error);
                //  console.log(results);
                // console.log( '.' + servico_id  + '.');
                // console.log('.' + pet_id  + '.');

                // return res.status(201).json({msg: 'sucesso'})

                pool.query(queries.getMaxAgendamentoId, (error, results) => {

                    const agendamento_id = results.rows[0].max
                    //return res.status(200).json({msg: 'sucesso'})

                    // return res.status(200).json({agendamento_id});

                    pool.query(queries.getAgendamentoById, [agendamento_id], (error, results) => {


                        console.log('sucesso');

                        return res.status(200).json(results.rows);

                    })
                })

            })

        })

    })

}



const deleteAgendamento = (req, res) => {

    const agendamento_id = parseInt(req.params.agendamento_id);

    pool.query(queries.deleteAgendamento, [agendamento_id], (error, results) => {

        return res.status(200).json({ msg: 'Agendamento removido com sucesso. ' });

    })

}


const updateAgendamento = (req, res) => {

    const agendamento_id = (req.params.agendamento_id);
    const { horario, data, servicos_pet, nome_pet } = req.body;

    pool.query(queries.getIdServicoByServico, [servicos_pet], (error, results) => {

        const servico_id = results.rows[0].servico_id

        //return res.status(200).json(servico_id);

        pool.query(queries.getIdPetByNomePet, [nome_pet], (error, results) => {

            const pet_id = results.rows[0].pet_id
            //return res.status(200).json(pet_id);


            pool.query(queries.updateAgendamento, [horario, data, servico_id, pet_id, agendamento_id], (error, results) => {

                // return res.status(200).json(agendamento_id);

                return res.status(200).send("Agendamento atualizado com sucesso!");

            })

        })

    })

}



module.exports = {
    postAgendamento,
    getAgendamento,
    deleteAgendamento,
    updateAgendamento,
    getAgendamentoById,
}