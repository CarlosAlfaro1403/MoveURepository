const {Taxista} = require('../../database/models/index')
const {SedeCooperativa} = require('../../database/models/index')

class TaxistaController {

    static async create (req, res) {
        const Sedes = await SedeCooperativa.findAll({
            attributes:['id_sede', 'nombre_sede']
        });
        res.render('taxista/taxistaCreate',{
            sedes: Sedes
        });
    }

    static async edit (req, res) {
        const taxista = await Taxista.findByPk(req.params.id);
        const Sedes = await SedeCooperativa.findAll({
            attributes:['id_sede', 'nombre_sede']
        });
        res.render('taxista/taxistaEdit', {
            taxista : taxista.dataValues,
            sedes: Sedes
        });
    }

    static async showAll (req, res) {
        const taxistas = await Taxista.findAll({
            attributes:['id_taxista','id_sede', 'nombre_taxista','apellido_taxista','dui_taxista','num_circulacion','edad_taxista','telefono_taxista','posee_auto']
        }); 
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
                posee_auto: taxistaPoseeAuto
            })
            res.redirect('/taxistas');
        }
    }

    static async update (req, res) {
        const {taxistaNombre, taxistaIdSede, taxistaApellido,taxistaDui,taxistaNumCirculacion,taxistaEdad,taxistaTelefono,taxistaPoseeAuto } = req.body;
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
                posee_auto: taxistaPoseeAuto
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