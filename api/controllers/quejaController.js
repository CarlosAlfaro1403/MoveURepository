const {Queja} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class QuejaController {

    // redireccionar a la vista de crear usuario
    static create (req, res) {
        res.render('queja/quejaCreate');
    }

    static async edit (req, res) {
        const queja = await Queja.findByPk(req.params.id);
        console.log(queja);
        res.render('queja/quejaEdit', {
            queja : queja.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const Quejas = await Queja.findAll({
            attributes: ['id_queja', 'id_cliente', 'id_viaje', 'id_taxista', 'nombre_queja', 'descripcion_queja']
        });
        res.render('queja/quejaIndex', {
            quejas : Quejas
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
                descripcion_queja: descripcionQueja
            })
            res.redirect('/quejas');
        }
    }

    static async update (req, res) {
        const { idCliente, idViaje, idTaxista, nombreQueja, descripcionQueja } = req.body;
        if(!idCliente || !idViaje || !idTaxista || !nombreQueja || !descripcionQueja) {
            console.log('Campos incompletos');
        }else {
            const queja = await Queja.update({
                id_cliente: idCliente,
                id_viaje: idViaje,
                id_taxista: idTaxista,
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
