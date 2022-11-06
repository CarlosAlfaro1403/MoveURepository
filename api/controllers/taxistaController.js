const session = require('express-session');
const {Taxista,Vehiculo,Viaje} = require('../../database/models/index')
const {SedeCooperativa, Usuario} = require('../../database/models/index')

class TaxistaController {

    static async create (req, res) {
        const user = await Usuario.findOne({
            where: {nombre_usuario:req.app.locals.user}
        })
        const Sedes = await SedeCooperativa.findAll({
            where:{id_sede: user.id_sede}
        });
        res.render('taxista/taxistaCreate',{
            sedes: Sedes
        });
    }

    static async edit (req, res) {
        const user = await Usuario.findOne({
            where: {nombre_usuario:req.app.locals.user}
        })
        const taxista = await Taxista.findByPk(req.params.id);
        const Sedes = await SedeCooperativa.findAll({
            where:{id_sede: user.id_sede}
        });
        res.render('taxista/taxistaEdit', {
            taxista : taxista.dataValues,
            sedes: Sedes
        });
    }

    static async showAll (req, res) {
        const user = await Usuario.findOne({
            where: {nombre_usuario:req.app.locals.user}
        })
        const taxistas = await Taxista.findAll({
             where:{id_sede: user.id_sede}
        }); 
        console.log(taxistas);
        const Sedes = await SedeCooperativa.findAll({
            attributes:['id_sede', 'nombre_sede']
        });
        res.render('taxista/taxistaIndex', {
            taxistas : taxistas,
            sedes: Sedes
        });
    }

    static async show (req, res) {
        const taxista = await Taxista.findByPk(req.params.id);
        res.render('taxista/taxistaShow', {
            taxista
        });
    }

    static async store (req, res) {
        const {taxistaNombre, taxistaIdSede, taxistaApellido,taxistaDui,taxistaNumCirculacion,taxistaEdad,taxistaTelefono,taxistaPoseeAuto } = req.body;
        var poseeAuto;
        if(req.body.taxistaPoseeAuto){
            poseeAuto = 'True';
        }
        else{
            poseeAuto = 'False';
        }

        if(!taxistaNombre || !taxistaIdSede || !taxistaApellido) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const sede = await Taxista.create({
                id_sede: taxistaIdSede,
                nombre_taxista: taxistaNombre,
                apellido_taxista: taxistaApellido,
                dui_taxista: taxistaDui,
                num_circulacion: taxistaNumCirculacion,
                edad_taxista: taxistaEdad,
                telefono_taxista: taxistaTelefono,
                posee_auto: poseeAuto
            })
            res.redirect('/taxistas');
        }
    }

    static async update (req, res) {
        const {taxistaNombre, taxistaIdSede, taxistaApellido,taxistaDui,taxistaNumCirculacion,taxistaEdad,taxistaTelefono,taxistaPoseeAuto } = req.body;
        console.log(req.body.taxistaPoseeAuto);
        var poseeAuto='false';
        if(req.body.taxistaPoseeAuto){
            poseeAuto = 'True';
        }
        else{
            poseeAuto = 'False';
        }
        if(!taxistaNombre || !taxistaIdSede || !taxistaApellido) {
            console.log('Campos incompletos');
        }else {
            const sede = await Taxista.update({
                id_sede: taxistaIdSede,
                nombre_taxista: taxistaNombre,
                apellido_taxista: taxistaApellido,
                dui_taxista: taxistaDui,
                num_circulacion: taxistaNumCirculacion,
                edad_taxista: taxistaEdad,
                telefono_taxista: taxistaTelefono,
                posee_auto: poseeAuto
            }, {
                where: {
                    id_taxista: req.params.id
                }
            });
            res.redirect('/taxistas');
        }
    }

    static async delete (req, res) {
        const vehiculo = await Vehiculo.findAll({
            where:{id_taxista:req.params.id}
        });
        const viaje = await Viaje.findAll({
            where:{id_taxista:req.params.id}
        });

        if(vehiculo || viaje){
            //alert('No se puede eliminar, el taxista esat asociado a un vehiculo o un viaje');
            console.log('No se puede eliminar, el taxista esat asociado a un vehiculo o un viaje')
        }
        else{
            console.log(req.params);

            const sede = await Taxista.destroy({
                where: {
                    id_taxista: req.params.id
                }
            });
            res.redirect('/taxistas');
        }
    }
}
module.exports = TaxistaController