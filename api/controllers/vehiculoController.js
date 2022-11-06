const {Vehiculo, Taxista,} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class UsuarioController {

    // redireccionar a la vista de crear usuario
    static async create (req, res) {
        const taxistas = await Taxista.findAll({
            where:{id_sede: req.app.locals.idSede,posee_auto:false}
        });
        res.render('vehiculo/vehiculoCreate',{
            taxistas: taxistas
        });
    }

    static async edit (req, res) {
        const taxistas = await Taxista.findAll({
            where:{id_sede: req.app.locals.idSede}
        });
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        console.log(vehiculo);
        res.render('vehiculo/vehiculoEdit', {
            vehiculo : vehiculo.dataValues,
            taxistas : taxistas
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const taxistas = await Taxista.findAll({
            where:{id_sede: req.app.locals.idSede}
        });
        const vehiculos = await Vehiculo.findAll({
            where:{ id_sede: req.app.locals.idSede}
        });
        res.render('vehiculo/vehiculoIndex', {
            vehiculos : vehiculos,
            taxistas : taxistas
        });
    }

    static async show (req, res) {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        res.render('vehiculo/vehiculoShow', {
            vehiculo
        });
    }

    static async store (req, res) {
        const { idTaxista,marca,modelo, matricula,anio } = req.body;
        if(!marca || !modelo || !matricula || !anio) {
            res.render('vehiculo/vehiculoEdit',{message:'Contraseña no valida'});
        }else {
            console.log(req.body);
            const vehiculo = await Vehiculo.create({
                id_taxista: idTaxista,
                matricula: matricula,
                marca: marca,
                modelo: modelo,
                anho: anio,
                id_sede: req.app.locals.idSede
            })
            res.redirect('/vehiculos');
        }
    }

    static async storeT (req, res) {
        const { id_taxista,marca,modelo, matricula,anio } = req.body;
        console.log(req.body);
        if(!marca || !modelo || !matricula || !anio) {
            //res.render('vehiculo/vehiculoEdit',{message:'Contraseña no valida'});
        }else {
            console.log(req.body);
            const vehiculo = await Vehiculo.create({
                id_taxista: id_taxista,
                matricula: matricula,
                marca: marca,
                modelo: modelo,
                anho: anio,
                id_sede: req.app.locals.idSede
            })
            res.redirect('/taxistas');
        }
    }

    static async update (req, res) {
        const { idTaxista,marca,modelo, matricula,anio } = req.body;
        if(!marca || !modelo || !matricula || !anio) {
            console.log('Campos incompletos');
        }else {
            const vehiculo = await Vehiculo.update({
                id_taxista: idTaxista,
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
