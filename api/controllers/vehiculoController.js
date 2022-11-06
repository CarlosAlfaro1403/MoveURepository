const {Vehiculo,} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {

    // redireccionar a la vista de crear usuario
    static create (req, res) {
        res.render('vehiculo/vehiculoCreate');
    }

    static async edit (req, res) {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        console.log(vehiculo);
        res.render('vehiculo/vehiculoEdit', {
            vehiculo : vehiculo.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const vehiculos = await Vehiculo.findAll({
            where:{ id_sede: req.app.locals.idSede}
        });
        res.render('vehiculo/vehiculoIndex', {
            vehiculos : vehiculos
        });
    }

    static async show (req, res) {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        res.render('vehiculo/vehiculoShow', {
            vehiculo
        });
    }

    static async store (req, res) {
        const { marca,modelo, matricula,anio } = req.body;
        if(!marca || !modelo || !matricula || !anio) {
            res.render('vehiculo/vehiculoEdit',{message:'Contraseña no valida'});
        }else {
            console.log(req.body);
            const vehiculo = await Vehiculo.create({
                matricula: matricula,
                marca: marca,
                modelo: modelo,
                anho: anio,
                id_sede: req.app.locals.idSede
            })
            res.redirect('/vehiculos');
        }
    }

    static async update (req, res) {
        const { marca,modelo, matricula,anio } = req.body;
        if(!marca || !modelo || !matricula || !anio) {
            console.log('Campos incompletos');
        }else {
            const vehiculo = await Vehiculo.update({
                matricula: matricula,
                marca: marca,
                modelo: modelo,
                anho: anio,
                id_sede: req.app.locals.idSede
            }, {
                where: {
                    id_vehiculo: req.params.id
                }
            });
            res.redirect('/vehiculos');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const vehiculo = await Vehiculo.destroy({
            where: {
                id_vehiculo: req.params.id
            }
        });
        res.redirect('/vehiculos');
    }
}

module.exports = UsuarioController
