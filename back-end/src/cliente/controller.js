
const pool = require('../../db');
const queries = require('./queries');

// CONTROLER CLIENTE



const getCliente = (req, res) => {
   pool.query(queries.getCliente, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
   })
 
}




const getClienteByCpf = (req, res) => {
  const cpf =  req.params.cpf.toString();

pool.query(queries.getClienteByCpf,[ cpf], (error, results)=>{
   
      if ( results.rows.length === 0 ){

      return  res.status(422).json({ msg: 'cpf nao existe na base dados' });

      }
      else {
          
  pool.query(queries.getClienteByCpf, [cpf], (error, results) => {
    if (error) throw error;
   return  res.status(200).json(results.rows);

  })

      }
     
  })
 
} 


const addCliente = (req, res) => {
    const {cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento} = req.body;
 

    if (! nome) {
        return res.status(422).json({ msg: 'insira um nome'})

    }

    if (! cpf) {
        return res.status(422).json({ msg: 'insira um cpf'})

    }

    if (! telefone) {
        return res.status(422).json({ msg: 'insira um telefone'})

    }


    pool.query(queries.checkCpfExists, [cpf], (error, results, next) => {
        if(results.rows.length) {
            return res.status(422).json({ msg: 'cpf ja existe '})
           
        }
        else {


        // add cliente to db
       pool.query(queries.addCliente, [cpf, telefone, nome, numero, cidade, bairro, cep, rua, estado, email, complemento], (error, results) => {
           if (error) throw error;
           return  res.status(201).send("Cliente Salvo com sucesso!");
           
       }) 
    }
    })
}



const removeCliente =   (req, res) => {
    const cpf = req.params.cpf.toString();

 pool.query(queries.getClienteByCpf, [cpf],(error, results) => {
   
     
    if (  results.rows.length === 0
    
        ){
       return res.status(422).json({ msg: 'Cliente não existe na base de dados. Não é possível remover. '});
       
    
     } else {

        pool.query(queries.removeCliente, [cpf], (error, results) => {
           
            return res.status(201).json({ msg: 'Cliente removido com sucesso. '});
             
          }) }
        
 });
  
}





const updateCliente = (req, res) => {
    const cpf = req.params.cpf.toString();
    const { nome, telefone, numero, cidade, bairro, cep, rua, estado, email, complemento} = req.body;

    pool.query(queries.getClienteByCpf, [ cpf], (error, results) =>{
        
        if(results.rows.length === 0){
            res.status(422).json({msg: 'Cliente não existe na base de dados. Não é possivel atualizar cadastro.'})
        }
        else {

        pool.query(queries.updateCliente, [ nome, telefone, numero, cidade, bairro, cep, rua, estado, email, complemento,cpf], (error, results) =>{
            
            res.status(200).send("Cliente atualizado com sucesso!");
        })
    }

    })
}




module.exports = {
    getCliente,
    getClienteByCpf,
    addCliente,
    removeCliente,
    updateCliente,
    
};