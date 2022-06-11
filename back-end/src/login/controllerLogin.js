const pool = require('../../db');
const queries = require('./queriesLogin');


const getUsuario = async (req, res) => {
  const { username, senha } = req.body;

  const login = await pool.query(queries.getUsuario)
  //checar se email e senha não são vazios
  if (!username) {
    return res.status(422).json({ msg: 'insira um usuario' })

  }

  if (!senha) {
    return res.status(422).json({ msg: 'Insira uma senha' })
  }

  pool.query(queries.getUsuarioByUsuario, [username], (error, results) => {

    if (results.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario não encontrado' })
    }
    else {
      pool.query(queries.getUsuarioBySenha, [senha], (error, results) => {

        if (results.rows.length === 0) {
          return res.status(404).json({ msg: 'Senha invalida.' })

        } else {
          console.log('sucesso')

          return res.status(200).json({ msg: 'ok' })
        }
      })
    }
  })
}


module.exports = {
  getUsuario,
};