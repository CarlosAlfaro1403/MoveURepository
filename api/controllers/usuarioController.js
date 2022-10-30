const Usuario = require('../../database/models/usuarios')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {
    static async showAll (req, res) {
        const Usuarios = await Usuario.findAll({
            attributes: ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'estado_usuario']
        });
        console.log(Usuarios);
        res.render('usuarioCreate', {
            usuarios : Usuarios
        });
    }

}

module.exports = UsuarioController
