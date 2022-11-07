const {Viaje,Usuario} = require('../../database/models/index')
const {Taxista} = require('../../database/models/index')
const { Sequelize } = require('sequelize')

class ViajeController {

    // redireccionar a la vista de crear usuario
    static async create (req, res) {
        const taxista = await Taxista.findOne({
            where: { id_sede: req.app.locals.idSede,
                disponibilidad: true },
            order: [ [ 'asignado_cola', 'DESC' ]],
        });
        res.render('viaje/viajeCreate',{
            taxista:taxista
        });
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
            attributes: ['id_viaje', 'estado_viaje', 'cliente_ubicacion']
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

    static async notificacion (req, res) {
        const viaje = await Viaje.findByPk(req.params.id);
        if (viaje.estado_viaje == "Confirmado"){
            var titulo = "Ruta seleccionada"
            var descripcion = "Lleve al cliente al destino seleccionado, luego precione Finalizar"
        }
        else {
            var titulo = "Seleccione ruta"
            var descripcion = "Deslice el punto de encuentro con cliente hacia la ubicación donde desea ir el cliente"
        }
        const taxista = await Taxista.findByPk(viaje.id_taxista);
        res.render('viaje/ViajeNotificacion', {
            viaje: viaje,
            taxista: taxista,
            titulo: titulo,
            descripcion: descripcion
        });
    }

    static async showAllNotificacion (req, res) {
        const Viajes = await Viaje.findAll({
            where: {
              estado_viaje: 'Pendiente'
            }
          });
        res.render('viaje/viajeNotificacionIndex', {
            viajes : Viajes
        });
    }

    static async updateNotificacion (req, res) {
        const { destino_coordenadas, estado_viaje, costo, tiempo_total, id_taxista} = req.body;
        if (!destino_coordenadas){
            req.body.destino_coordenadas = '';
        }
        if(!estado_viaje) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            const viaje = await Viaje.update({
                estado_viaje: estado_viaje,
                destino_coordenadas: destino_coordenadas,
                costo_servicio: costo,
                tiempo_servicio: tiempo_total
            }, {
                where: {
                    id_viaje: req.params.id
                }
            });
            res.redirect('/viajes');
            console.log('Viaje actualizado');
        }
    }
    
    static async store (req, res) {
        const { direccion, taxista, cliente_ubicacion} = req.body;
        console.log(direccion)
        console.log(taxista)
        let id_taxista = taxista
        console.log(cliente_ubicacion)
        if(!direccion || !taxista || !cliente_ubicacion) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const viaje = await Viaje.create({
                cliente_coordenadas: direccion,
                cliente_ubicacion: cliente_ubicacion,
                destino_coordenadas: direccion,
                id_taxista: id_taxista,
                estado_viaje: 'Pendiente',
                id_sede: req.app.locals.idSede
            });
            const taxista = await Taxista.update({
                disponibilidad: false
            }, {
                where: {
                    id_taxista: id_taxista
                }
            });
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
