// var pool = require('../../database/conexion.js')
const { localsName } = require('ejs');
const Usuario = require('../../database/models/usuarios')

exports.login = (req, res) => {
    res.render('login');
}

exports.auth = async(req,res)=>{
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({
        where: {
            nombre_usuario: usuario, password: password
        }
    });   
    if(user){
        req.app.locals = {user:req.body.usuario,userName:user.nombres,idSede:user.id_sede};
        req.session.user=req.body.usuario;
        if(user.password == req.body.password){
            if(user.id_tipo_usuario==1) //Admin
            {
                res.redirect('dashboard');
            }
            else if(user.id_tipo_usuario==2) //Taxista
            {
                res.redirect('/viajes/notificaciones');
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

