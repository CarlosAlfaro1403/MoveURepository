const {Accidente,Vehiculo} = require('../../database/models/index')

class AccidenteController {

    // redireccionar a la vista de crear accidente
    static async create (req, res) {
        if(req.app.locals.isOperador === 1){
            const vehiculos = await Vehiculo.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            res.render('accidente/accidenteCreate',{
                vehiculos: vehiculos
            });
        }
        else{
            res.redirect('/');
        }
    }

    static async edit (req, res) {
        if(req.app.locals.isOperador === 1){
            const vehiculos = await Vehiculo.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            const accidente = await Accidente.findByPk(req.params.id);
            res.render('accidente/accidenteEdit', {
                accidente : accidente.dataValues,
                vehiculos: vehiculos
            });
        }
        else{
            res.redirect('/');
        }
    }

    // metodos de la clase
    static async showAll (req, res) {
        if(req.app.locals.isOperador === 1){
            const vehiculos = await Vehiculo.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            const Accidentes = await Accidente.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            res.render('accidente/accidenteIndex', {
                accidentes : Accidentes,
                vehiculos: vehiculos
            });
        }
        else{
            res.redirect('/');
        }
    }

    static async show (req, res) {
        const accidente = await Accidente.findByPk(req.params.id);
        res.render('accidente/accidenteShow', {
            accidente
        });
    }

    static async store (req, res) {
        const { vehiculo, costo, descripcion } = req.body;
        if(!vehiculo || !costo) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const accidente = await Accidente.create({
                id_vehiculo: vehiculo,
                costo_accidente: costo,
                descripcion_accidente: descripcion,
                id_sede: req.app.locals.idSede
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
                descripcion_accidente: descripcion,
                id_sede: req.app.locals.idSede
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