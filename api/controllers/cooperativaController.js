const {Cooperativa, Cooperativa} = require('../../database/models/index')

// exports.user = (req, res) => {
//     res.render('usuarioCreate');
// }

class CooperativaController {

    // redireccionar a la vista de crear usuario
    static create (req, res) {
        res.render('cooperativa/cooperativaCreate');
    }

    static async edit (req, res) {
        const cooperativa = await Cooperativa.findByPk(req.params.id);
        console.log(cooperativa);
        res.render('cooperativa/cooperativaEdit', {
            cooperativa: cooperativa.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const Cooperativa = await Cooperativa.findAll({
            attributes: ['id_Cooperativa', 'nombre_cooperativa', 'num_identificacion', 'correo_Cooperativa', 'direccion_cooperativa', 'telefono_Cooperativa']
        });
        res.render('cooperativa/cooperativaIndex', {
            cooperativa : Cooperativa
        });
    }

    static async show (req, res) {
        const cooperativa = await Cooperativa.findByPk(req.params.id);
        res.render('cooperativa/cooperativaShow', {
            cooperativa
        });
    }

    static async store (req, res) {
        const { idCooperativa,nomCooperativa, numCooperativa, correoCooperativa, dirreccionCooperativa, telCooperativa} = req.body;
        if(!idCooperativa || !nomCooperativa || !numCooperativa || !correoCooperativa || !dirreccionCooperativa|| !telCooperativa) {
            // res.render('usuario/usuarioCreate', {
            //     error: 'Campos incompletos'
            // });
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const Cooperativa = await Cooperativa.create({
                id_Cooperativa: idCooperativa,
                nombre_cooperativa: nomCooperativa,
                num_identificacion: numCooperativa,
                correo_Cooperativa: correoCooperativa,
                direccion_cooperativa: dirreccionCooperativa,
                telefono_Cooperativa : telCooperativa,
                

            })
            res.redirect('/cooperativa');
        }
    }

    static async update (req, res) {
        const { idCooperativa,nomCooperativa, numCooperativa, correoCooperativa, dirreccionCooperativa, telCooperativa} = req.body;
        if(!idCooperativa || !nomCooperativa || !numCooperativa || !correoCooperativa || !dirreccionCooperativa|| !telCooperativa) {
            console.log('Campos incompletos');
        }else {
            const cooperativa = await Cooperativa.update({
                id_Cooperativa: idCooperativa,
                nombre_cooperativa: nomCooperativa,
                num_identificacion: numCooperativa,
                correo_Cooperativa: correoCooperativa,
                direccion_cooperativa: dirreccionCooperativa,
                telefono_Cooperativa : telCooperativa,
            }, {
                where: {
                    id_Cooperativa: req.params.id
                }
            });
            res.redirect('/cooperativa');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const cooperativa = await Cooperativa.destroy({
            where: {
                id_Cooperativa: req.params.id
            }
        });
        res.redirect('/cooperativa');
    }
}

module.exports = CooperativaController