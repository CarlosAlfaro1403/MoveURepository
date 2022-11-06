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
        const Sedes = await SedeCooperativa.findAll({
            where:{id_sede: user.id_sede}
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

            if(!taxistaNombre || !taxistaIdSede || !taxistaApellido) {
                console.log('Campos incompletos');
            }else {
                console.log(req.body);
                const newTaxista = await Taxista.create({
                    id_sede: taxistaIdSede,
                    nombre_taxista: taxistaNombre,
                    apellido_taxista: taxistaApellido,
                    dui_taxista: taxistaDui,
                    num_circulacion: taxistaNumCirculacion,
                    edad_taxista: taxistaEdad,
                    telefono_taxista: taxistaTelefono,
                    posee_auto: poseeAuto
                });

                const taxistas = await Taxista.findAll({
                    where:{id_sede: taxistaIdSede}
                });
                res.render('vehiculo/vehiculoCreateT',{
                    newTaxista: newTaxista,
                    taxistas: taxistas
                }); 
            }
        }
        else{
            poseeAuto = 'False';

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
    }

    static async update (req, res) {
        const taxista = await Taxista.findOne({
            where:{id_taxista:req.params.id}
        })
        const {taxistaNombre, taxistaApellido,taxistaDui,taxistaNumCirculacion,taxistaEdad,taxistaTelefono,taxistaPoseeAuto } = req.body;
        var poseeAuto='false';
        if(req.body.taxistaPoseeAuto){
            poseeAuto = 'True';
        }
        else{
            poseeAuto = 'False';
        }
        if(!taxistaNombre ||  !taxistaApellido) {
            console.log('Campos incompletos');
        }else {
            const sede = await Taxista.update({
                id_sede: taxista.id_sede,
                nombre_taxista: taxistaNombre,
                apellido_taxista: taxistaApellido,
                dui_taxista: taxistaDui,
                num_circulacion: taxistaNumCirculacion,
                edad_taxista: taxistaEdad,
                telefono_taxista: taxistaTelefono,
                posee_auto: taxista.posee_auto
            }, {
                where: {
                    id_taxista: req.params.id
                }
            });
            res.redirect('/taxistas');
        }
    }

    static async delete (req, res) {
            console.log(req.params);

            const sede = await Taxista.destroy({
                where: {
                    id_taxista: req.params.id
                }
            });
            res.redirect('/taxistas');
    }
}
module.exports = TaxistaController