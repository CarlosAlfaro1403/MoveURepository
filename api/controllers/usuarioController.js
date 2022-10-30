const Usuario = require('../../database/models/usuarios')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {

    static async user (req, res) {
        res.render('administrarUsuario');
    }

    static async showAll (req, res) {
        const Usuarios = await Usuario.findAll({
            attributes: ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'estado_usuario']
        });
        res.render('usuario/usuarioCreate', {
            usuarios : Usuarios
        });
    }
}

module.exports = UsuarioController
