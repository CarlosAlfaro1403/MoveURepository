const {TipoUsuario, Usuario} = require('../../database/models/index')

class TipoUsuarioController {

    static create (req, res) {
        if(req.app.locals.isAdmin === 1){
            res.render('tipoUsuario/tipoUsuarioCreate');
        }
        else{
            res.redirect('/');
        }
    }

    static async edit (req, res) {
        if(req.app.locals.isAdmin === 1){
            const tipoUsuario = await TipoUsuario.findByPk(req.params.id);
            res.render('tipoUsuario/tipoUsuarioEdit', {
                tipoUsuario : tipoUsuario.dataValues
            });
        }
        else{
            res.redirect('/');
        }
    }

    static async showAll (req, res) {
        if(req.app.locals.isAdmin === 1){
            const tipoUsuarios = await TipoUsuario.findAll({
                attributes:['id_tipo_usuario','nombre_tipo_usuario']
            }); 
            res.render('tipoUsuario/tipoUsuarioIndex', {
                tipoUsuarios : tipoUsuarios
            });
        }
        else{
            res.redirect('/');
        }
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
        const usuarios = await Usuario.findAll({
            where:{id_tipo_usuario: req.params.id}
        });

        if(usuarios){
            res.redirect('/tipoUsuarios');
        }
        else
        {
            console.log(req.params);

            const tipoUsuario = await TipoUsuario.destroy({
                where: {
                    id_tipo_usuario: req.params.id
                }
            });
            res.redirect('/tipoUsuarios');
        }
    }
}
module.exports = TipoUsuarioController