// var pool = require('../../database/conexion.js')
const Usuario = require('../../database/models/usuarios')

exports.login = (req, res) => {
    res.render('login');
}

exports.auth = async(req,res)=>{
    const { usuario, password } = req.body;
    console.log(req.body)
    // const user = await pool.query('SELECT * FROM public.usuarios WHERE nombre_usuario = $1',[req.body.usuario]);
    const user = await Usuario.findOne({
        where: {
            nombre_usuario: usuario, password: password
        }
    });
    console.log(user);

    req.session.user=req.body.usuario;
    if(user){
        let usuario=req.session.user;
        res.redirect('/dashboard');
    }else{
        res.render('login',{message:'Usuario no valido'});
    }
}

exports.logout = (req,res)=>{
    req.session.destroy(function(err){
        if(err){
            res.send("Error");
        }
        else{
            res.redirect('/');
        }
    })
}

