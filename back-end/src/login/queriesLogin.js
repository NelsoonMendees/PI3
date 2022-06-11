const getUsuarioByUsuario = "SELECT username FROM login where username= $1 ";
const getUsuarioBySenha = "SELECT senha FROM login where senha= $1";
const checkUsuarioExists = "SELECT s FROM login s WHERE s.username = $1 ";
const checkSenhaExists = "SELECT s FROM login s WHERE s.senha = $1 ";
const getUsuario = "SELECT * FROM login";



module.exports = {
    getUsuarioByUsuario,
    getUsuarioBySenha,
    checkUsuarioExists,
    checkSenhaExists,
    getUsuario,
};