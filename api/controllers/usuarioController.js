const {Usuario, TipoUsuario} = require('../../database/models/index')
const {SedeCooperativa} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {

    // redireccionar a la vista de crear usuario
    static async create (req, res) {
        if(req.app.locals.isAdmin === 1){
            const Sedes = await SedeCooperativa.findAll({
                attributes:['id_sede', 'nombre_sede']
            });
            const TipoUsuarios = await TipoUsuario.findAll({
                attributes:['id_tipo_usuario', 'nombre_tipo_usuario']
            })
            res.render('usuario/usuarioCreate',{
                sedes: Sedes,
                tipoUsuarios: TipoUsuarios
            });
        }
        else{
            res.redirect('/');
        }
        
    }

    static async edit (req, res) {
        if(req.app.locals.isAdmin === 1){
            const usuario = await Usuario.findByPk(req.params.id);
            const Sedes = await SedeCooperativa.findAll({
                attributes:['id_sede', 'nombre_sede']
            });
            const TipoUsuarios = await TipoUsuario.findAll({
                attributes:['id_tipo_usuario', 'nombre_tipo_usuario']
            })
            res.render('usuario/usuarioEdit', {
                usuario : usuario.dataValues,
                sedes: Sedes,
                tipoUsuarios: TipoUsuarios
            });
        }
        else{
            res.redirect('/');
        }
    }

    // metodos de la clase
    static async showAll (req, res) {
        if(req.app.locals.isAdmin === 1){
            const Usuarios = await Usuario.findAll({
                attributes: ['id_usuario', 'nombre_usuario', 'apellidos', 'estado_usuario','nombres','id_sede']
            });
            const Sedes = await SedeCooperativa.findAll({
                attributes:['id_sede', 'nombre_sede']
            });
            res.render('usuario/usuarioIndex', {
                usuarios : Usuarios,
                sedes: Sedes
            });
        }
        else{
            res.redirect('/');
        }      
    }

    static async show (req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        res.render('usuario/usuarioShow', {
            usuario
        });
    }

    static async store (req, res) {
        const { userName,names, lastName,id_sede,id_tipo_usuario, password,estado } = req.body;
        if(!userName || !lastName || !password) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const usuario = await Usuario.create({
                nombre_usuario: userName,
                nombres: names,
                apellidos: lastName,
                id_sede: id_sede,
                id_tipo_usuario: id_tipo_usuario,
                password: password,
                estado_usuario: estado
            })
            res.redirect('/usuarios');
        }
    }

    static async update (req, res) {
        const { userName,names, lastName,id_sede,id_tipo_usuario, password,estado } = req.body;
        if(!userName || !lastName || !password) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            const usuario = await Usuario.update({
                nombre_usuario: userName,
                id_sede: id_sede,
                nombres: names,
                apellidos: lastName, 
                id_tipo_usuario: id_tipo_usuario,
                password: password,
                estado_usuario: estado
            }, {
                where: {
                    id_usuario: req.params.id
                }
            });
            res.redirect('/usuarios');
        }
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
