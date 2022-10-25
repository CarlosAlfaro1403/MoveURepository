var pool = require('../database/conexion');

exports.user = (req, res) => {
    res.render('usuarioCreate');
}