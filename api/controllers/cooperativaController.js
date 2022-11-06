const {Cooperativa} = require('../../database/models/index')

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
        res.render('cooperativa/cooperativaEdit', {
            cooperativa: cooperativa.dataValues
        });
    }

    // metodos de la clase
    static async showAll (req, res) {
        const cooperativas = await Cooperativa.findAll();
        res.render('cooperativa/cooperativaIndex', {
            cooperativas : cooperativas
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
            const cooperativa = await Cooperativa.create({
                id_cooperativa: idCooperativa,
                nombre_cooperativa: nomCooperativa,
                num_identificacion: numCooperativa,
                correo_cooperativa: correoCooperativa,
                direccion_cooperativa: dirreccionCooperativa,
                telefono_cooperativa : telCooperativa,
                

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
                id_cooperativa: idCooperativa,
                nombre_cooperativa: nomCooperativa,
                num_identificacion: numCooperativa,
                correo_cooperativa: correoCooperativa,
                direccion_cooperativa: dirreccionCooperativa,
                telefono_cooperativa : telCooperativa,
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