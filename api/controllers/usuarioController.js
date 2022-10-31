const {Usuario} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {

    // redireccionar a la vista de crear usuario
    static create (req, res) {
        res.render('usuario/usuarioCreate');
    }

    static async edit (req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        console.log(usuario);
        res.render('usuario/usuarioEdit', {
            usuario : usuario.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const Usuarios = await Usuario.findAll({
            attributes: ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'estado_usuario']
        });
        res.render('usuario/usuarioIndex', {
            usuarios : Usuarios
        });
    }

    static async show (req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        res.render('usuario/usuarioShow', {
            usuario
        });
    }

    static async store (req, res) {
        const { userName, lastName, password } = req.body;
        if(!userName || !lastName || !password) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const usuario = await Usuario.create({
                nombre_usuario: userName,
                apellido_usuario: lastName,
                password: password
            })
            res.redirect('/usuarios');
        }
    }

    static async update (req, res) {
        const usuario = await Usuario.update(req.body, {
            where: {
                id_usuario: req.params.id
            }
        });
        res.redirect('/usuarios');
    }

    static async delete (req, res) {
        console.log(req.params);

        const usuario = await Usuario.destroy({
            where: {
                id_usuario: req.params.id
            }
        });
        res.redirect('/usuarios');
    }
}

module.exports = UsuarioController
