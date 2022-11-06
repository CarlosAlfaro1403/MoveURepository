const {SedeCooperativa,Usuario} = require('../../database/models/index')

class SedeController {

    static create (req, res) {
        res.render('sede/sedeCreate');
    }

    static async edit (req, res) {
        const sede = await SedeCooperativa.findByPk(req.params.id);
        res.render('sede/sedeEdit', {
            sede : sede.dataValues
        });
    }

    static async showAll (req, res) {
        const Sedes = await SedeCooperativa.findAll({
            attributes:['id_sede','id_cooperativa', 'nombre_sede','direccion_sede']
        }); 
        res.render('sede/sedeIndex', {
            sedes : Sedes
        });
    }

    static async show (req, res) {
        const sede = await SedeCooperativa.findByPk(req.params.id);
        res.render('sede/sedeShow', {
            sede
        });
    }

    static async store (req, res) {
        const {sedeNombre, direccion, cooperativa } = req.body;
        if(!sedeNombre || !direccion || !cooperativa) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const sede = await SedeCooperativa.create({
                nombre_sede: sedeNombre,
                direccion_sede: direccion,
                id_cooperativa: cooperativa
            })
            res.redirect('/sedes');
        }
    }

    static async update (req, res) {
        const {sedeNombre, direccion, cooperativa } = req.body;
        if(!sedeNombre || !direccion || !cooperativa) {
            console.log('Campos incompletos');
        }else {
            const sede = await SedeCooperativa.update({
                nombre_sede: sedeNombre,
                direccion_sede: direccion,
                id_cooperativa: cooperativa
            }, {
                where: {
                    id_sede: req.params.id
                }
            });
            res.redirect('/sedes');
        }
    }

    static async delete (req, res) {
        const usuarios = await Usuario.findAll({
            where:{id_sede:req.params.id}
        });

        if(usuarios){
            const Sedes = await SedeCooperativa.findAll({
                attributes:['id_sede','id_cooperativa', 'nombre_sede','direccion_sede']
            }); 
            res.render('./sede/sedeIndex',{message:'No se puede eliminar, la sede esta asociada a un usuario',
                sedes: Sedes    
            });
        }
        else{
            console.log(req.params);

            const sede = await SedeCooperativa.destroy({
                where: {
                    id_sede: req.params.id
                }
            });
            res.redirect('/sedes');
            }      
    }
}
module.exports = SedeController