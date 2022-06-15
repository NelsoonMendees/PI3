const getUsuarioByUsuario = "SELECT username FROM login where username= $1 ";
const getUsuarioBySenha = "SELECT senha FROM login where senha= $1";


module.exports = {
    getUsuarioByUsuario,
    getUsuarioBySenha,
};