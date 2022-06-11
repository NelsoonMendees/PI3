const pool = require('../../db');
const queries = require('./queriesPet')


const getPet =  (req, res) =>{
    pool.query(queries.getPet, (error, result) =>{
        res.status(200).json(result.rows);
    })

}


const getPetByCliente = (req, res) =>{
    const cpf =  parseInt(req.params.cpf);


    pool.query(queries.getIdClienteByCpf,[cpf], (error,results) =>{
        const id_cliente = results.rows[0].id_cliente

       

        pool.query(queries.getPetByCliente,[id_cliente], (error,results) =>{

            return res.status(200).json(results);

        })

    })
}


const addClienteEPet = (req, res) =>{

    const {cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento} = req.body;
    const {nome_pet} = req.body;
    const { raca_pet} = req.body

    pool.query(queries.addCliente, [cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento],(error, results) =>{

    

        pool.query(queries.getMaxCliente, (error, results)=>{
            const id_cliente = results.rows[0].max

           // return res.status(200).json(id_cliente);


          

            pool.query(queries.getIdRacaByNomeRaca, [raca_pet] , (error, results)=> { 
                  const raca_id = results.rows[0].raca_id

               
              
               pool.query(queries.addPet, [nome_pet, id_cliente, raca_id],(error,results)=>{

                    return res.status(201).json({msg: 'cliente e pet salvos com sucesso '})

               })

            })
              
        })

    })

    

   // const id_cliente = pool.query(queries.getMaxCliente);

   // const id_pet = pool.query(queries.getIdRacaByNomeRaca);


   // pool.query(queries.addPet,[ nomePet, id_cliente, id_pet],(error, result)=>{



  //  })

    

    
}


const addPet = (req, res) =>{

    


    pool.query(queries.addPet, (error, result) =>{

    })
}

const updatePet = (req, res) =>{
    pool.query(queries.updatePet, (error, result) =>{

    })
}

const deletePet = (req, res) =>{
    pool.query(queries.deletePet, (error, result) =>{

    })
}


module.exports = {
    addClienteEPet,
    addPet, 
    getPet,
    getPetByCliente,
}