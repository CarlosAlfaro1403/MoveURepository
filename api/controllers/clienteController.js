const {Cliente} = require('../../database/models/index')

class ClienteController {

    // redireccionar a la vista de crear accidente
    static async create (req, res) {
        if(req.app.locals.isOperador === 1){
            const clientes = await Cliente.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            res.render('cliente/clienteCreate',{
                clientes: clientes
            });
        }
        else{
            res.redirect('/');
        }
    }

    static async edit (req, res) {
        if(req.app.locals.isOperador === 1){
            const cliente = await Cliente.findByPk(req.params.id);
            res.render('cliente/clienteEdit', {
                cliente : cliente.dataValues
            });
        }
        else{
            res.redirect('/');
        }
    }

    // metodos de la clase
    static async showAll (req, res) {
        if(req.app.locals.isOperador === 1){
            const clientes = await Cliente.findAll({
                where:{ id_sede: req.app.locals.idSede}
            });
            res.render('cliente/clienteIndex', {
                clientes : clientes
            });
        }
        else{
            res.redirect('/');
        }
    }

    static async show (req, res) {
        const cliente = await Cliente.findByPk(req.params.id);
        res.render('cliente/clienteShow', {
            cliente
        });
    }

    static async store (req, res) {
        const { nombreCliente, apellidoCliente, duiCliente,telefonoCliente } = req.body;
        if(!nombreCliente || !apellidoCliente || !duiCliente || !telefonoCliente) {
            console.log('Campos incompletos');
        }else {
            console.log(req.body);
            const cliente = await Cliente.create({
                nombre_cliente: nombreCliente,
                apellido_cliente: apellidoCliente,
                dui_cliente: duiCliente,
                telefono_cliente: telefonoCliente,
                id_sede: req.app.locals.idSede
            })
            res.redirect('/clientes');
        }
    }

    static async update (req, res) {
        const { nombreCliente, apellidoCliente, duiCliente,telefonoCliente } = req.body;
        if(!nombreCliente || !apellidoCliente || !duiCliente || !telefonoCliente) {
            console.log('Campos incompletos');
        }else {
            const cliente = await Cliente.update({
                nombre_cliente: nombreCliente,
                apellido_cliente: apellidoCliente,
                dui_cliente: duiCliente,
                telefono_cliente: telefonoCliente,
                id_sede: req.app.locals.idSede
            }, {
                where: {
                    id_cliente: req.params.id
                }
            });
            res.redirect('/clientes');
        }
    }

    static async delete (req, res) {
        console.log(req.params);

        const cliente = await Cliente.destroy({
            where: {
                id_cliente: req.params.id
            }
        });
        res.redirect('/clientes');
    }
}

module.exports = ClienteController