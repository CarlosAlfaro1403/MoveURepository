const {TipoUsuario} = require('../../database/models/index')

class TipoUsuarioController {

    static create (req, res) {
        res.render('tipoUsuario/tipoUsuarioCreate');
    }

    static async edit (req, res) {
        const tipoUsuario = await TipoUsuario.findByPk(req.params.id);
        res.render('tipoUsuario/tipoUsuarioEdit', {
            tipoUsuario : tipoUsuario.dataValues
        });
    }

    static async showAll (req, res) {
        const tipoUsuarios = await TipoUsuario.findAll({
            attributes:['id_tipo_usuario','nombre_tipo_usuario']
        }); 
        res.render('tipoUsuario/tipoUsuarioIndex', {
            tipoUsuarios : tipoUsuarios
        });
    }

    static async show (req, res) {
        const tipoUsuario = await TipoUsuario.findByPk(req.params.id);
        res.render('tipoUsuario/tipoUsuarioShow', {
            tipoUsuario
        });
    }

    static async store (req, res) {
        const {tipoUsuarioNombre} = req.body;
        if(!tipoUsuarioNombre) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const tipoUsuario = await TipoUsuario.create({
                nombre_tipo_usuario: tipoUsuarioNombre
            })
            res.redirect('/tipoUsuarios');
        }
    }

    static async update (req, res) {
        const {tipoUsuarioNombre} = req.body;
        if(!tipoUsuarioNombre) {
            console.log('Campos incompletos');
        }else {
            const tipoUsuario = await TipoUsuario.update({
                nombre_tipo_usuario: tipoUsuarioNombre
            }, {
                where: {
                    id_tipo_usuario: req.params.id
                }
            });
            res.redirect('/tipoUsuarios');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const tipoUsuario = await TipoUsuario.destroy({
            where: {
                id_tipo_usuario: req.params.id
            }
        });
        res.redirect('/tipoUsuarios');
    }
}
module.exports = TipoUsuarioController