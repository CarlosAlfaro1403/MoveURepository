// var pool = require('../../database/conexion.js')
const Usuario = require('../../database/models/usuarios')

exports.login = (req, res) => {
    res.render('login');
}

exports.auth = async(req,res)=>{
    const { usuario, password } = req.body;
    console.log(req.body)
    const user = await Usuario.findOne({
        where: {
            nombre_usuario: usuario, password: password
        }
    });
    req.session.user=req.body.usuario;
    if(user){
        let usuario=req.session.user;
        if(user.password == req.body.password){
            if(user.id_tipo_usuario==1) //Admin
            {
                res.redirect('dashboard');
            }
            else if(user.id_tipo_usuario==2) //Taxista
            {
                res.redirect('dashboardT');
            }
            else if(user.id_tipo_usuario==3) //Operador
            {
                res.redirect('dashboardO');
            }
        }else{
            res.render('login',{message:'Contraseña no valida'});
        }
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

