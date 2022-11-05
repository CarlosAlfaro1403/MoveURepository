const {Viaje} = require('../../database/models/index')
const {Taxista} = require('../../database/models/index')

class ViajeController {

    // redireccionar a la vista de crear usuario
    static create (req, res) {
        res.render('viaje/viajeCreate');
    }

    /*static async edit (req, res) {
        const usuario = await Usuario.findByPk(req.params.id);
        console.log(usuario);
        res.render('usuario/usuarioEdit', {
            usuario : usuario.dataValues
        });
    }*/

    // metodos de la clase
    static async showAll (req, res) {
        const Viajes = await Viaje.findAll({
            attributes: ['id_viaje', 'destino_viaje']
        });
        res.render('viaje/viajeIndex', {
            viajes : Viajes
        });
    }
    
    static async show (req, res) {
        const viaje = await Viaje.findByPk(req.params.id);
        const taxista = await Taxista.findByPk(viaje.id_taxista);
        res.render('viaje/ViajeShow', {
            viaje: viaje,
            taxista: taxista
        });
    }
    
    static async store (req, res) {
        const { direccion, taxista } = req.body;
        if(!direccion || !taxista ) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const viaje = await Viaje.create({
                destino_viaje: direccion,
                id_taxista: taxista
            })
            res.redirect('/viajes');
        }
    }
    /*
    static async update (req, res) {
        const { userName, lastName, password } = req.body;
        if(!userName || !lastName || !password) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            const usuario = await Usuario.update({
                nombre_usuario: userName,
                apellido_usuario: lastName,
                password: password
            }, {
                where: {
                    id_usuario: req.params.id
                }
            });
            res.redirect('/usuarios');
        }
    }*/
    /*
    static async delete (req, res) {
        console.log(req.params);

        const usuario = await Usuario.destroy({
            where: {
                id_usuario: req.params.id
            }
        });
        res.redirect('/usuarios');
    }*/
}


module.exports = ViajeController
