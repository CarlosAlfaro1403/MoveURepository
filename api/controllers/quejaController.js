const {Queja,Viaje,Taxista,Cliente} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class QuejaController {

    // redireccionar a la vista de crear usuario
    static async create (req, res) {
        const clientes = await Cliente.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const taxistas = await Taxista.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const viajes = await Viaje.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        res.render('queja/quejaCreate',{
            clientes: clientes,
            taxistas: taxistas,
            viajes: viajes
        });
    }

    static async edit (req, res) {
        const clientes = await Cliente.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const taxistas = await Taxista.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const viajes = await Viaje.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const queja = await Queja.findByPk(req.params.id);
        res.render('queja/quejaEdit', {
            queja : queja.dataValues,
            clientes: clientes,
            taxistas: taxistas,
            viajes: viajes
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const clientes = await Cliente.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const taxistas = await Taxista.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const viajes = await Viaje.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        const Quejas = await Queja.findAll({
            where: { id_sede: req.app.locals.idSede}
        });
        res.render('queja/quejaIndex', {
            quejas : Quejas,
            clientes: clientes,
            taxistas: taxistas,
            viajes: viajes
        });
    }

    static async show (req, res) {
        const queja = await Queja.findByPk(req.params.id);
        res.render('queja/quejaShow', {
            queja
        });
    }

    static async store (req, res) {
        const { idCliente, idViaje, idTaxista, nombreQueja, descripcionQueja } = req.body;
        if(!idCliente || !idViaje || !idTaxista || !nombreQueja || !descripcionQueja ) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const queja = await Queja.create({
                id_cliente: idCliente,
                id_viaje: idViaje,
                id_taxista: idTaxista,
                nombre_queja: nombreQueja,
                descripcion_queja: descripcionQueja,
                id_sede: req.app.locals.idSede
            })
            res.redirect('/quejas');
        }
    }

    static async update (req, res) {
        const quejaU = await Queja.findOne({
            where: {id_queja: req.params.id}
        });
        const { nombreQueja, descripcionQueja } = req.body;
        console.log(req.body);
        if(!nombreQueja || !descripcionQueja) {
            console.log('Campos incompletos');
        }else {
            const queja = await Queja.update({
                id_cliente: quejaU.id_cliente,
                id_viaje: quejaU.id_viaje,
                id_taxista: quejaU.id_taxista,
                nombre_queja: nombreQueja,
                descripcion_queja: descripcionQueja
            }, {
                where: {
                    id_queja: req.params.id
                }
            });
            res.redirect('/quejas');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const queja = await Queja.destroy({
            where: {
                id_queja: req.params.id
            }
        });
        res.redirect('/quejas');
    }
}

module.exports = QuejaController
