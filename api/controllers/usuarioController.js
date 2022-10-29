var pool = require('../../database/conexion.js');

exports.user = (req, res) => {
    res.render('usuarioCreate');
}