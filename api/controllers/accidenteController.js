const {Accidente} = require('../../database/models/index')
class AccidenteController {

    // redireccionar a la vista de crear accidente
    static create (req, res) {
        res.render('accidente/accidenteCreate');
    }

    static async edit (req, res) {
        const accidente = await Accidente.findByPk(req.params.id);
        console.log(accidente);
        res.render('accidente/accidenteEdit', {
            accidente : accidente.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const Accidentes = await Accidente.findAll({
            attributes: ['id_accidente', 'id_vehiculo', 'costo_accidente', 'descripcion_accidente']
        });
        res.render('accidente/accidenteIndex', {
            accidentes : Accidentes
        });
    }

    static async show (req, res) {
        const accidente = await Accidente.findByPk(req.params.id);
        res.render('accidente/accidenteShow', {
            accidente
        });
    }

    static async store (req, res) {
        const { vehiculo, costo, descripcion } = req.body;
        if(!vehiculo || !costo || !descripcion) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const accidente = await Accidente.create({
                id_vehiculo: vehiculo,
                costo_accidente: costo,
                descripcion_accidente: descripcion
            })
            res.redirect('/accidentes');
        }
    }

    static async update (req, res) {
        const { vehiculo, costo, descripcion } = req.body;
        if(!vehiculo || !costo || !descripcion) {
            console.log('Campos incompletos');
        }else {
            const accidente = await Accidente.update({
                id_vehiculo: vehiculo,
                costo_accidente: costo,
                descripcion_accidente: descripcion
            }, {
                where: {
                    id_accidente: req.params.id
                }
            });
            res.redirect('/accidentes');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const accidente = await Accidente.destroy({
            where: {
                id_accidente: req.params.id
            }
        });
        res.redirect('/accidentes');
    }
}

module.exports = AccidenteController