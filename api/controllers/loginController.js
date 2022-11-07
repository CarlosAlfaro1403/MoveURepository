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
            nombre_usuario: usuario
        }
    });   
    if(user){
        req.app.locals = {user:req.body.usuario,userName:user.nombres,idSede:user.id_sede};
        req.session.user=req.body.usuario;
        if(user.password === req.body.password){
            if(user.id_tipo_usuario==1) //Admin
            {
                req.app.locals.isAdmin=1;
                req.app.locals.isTaxista=0;
                req.app.locals.isOperador=0;
                res.redirect('usuarios');
            }
            else if(user.id_tipo_usuario==2) //Taxista
            {
                req.app.locals.isAdmin=0;
                req.app.locals.isTaxista=1;
                req.app.locals.isOperador=0;
                res.redirect('/viajes/notificaciones');
            }
            else if(user.id_tipo_usuario==3) //Operador
            {
                req.app.locals.isAdmin=0;
                req.app.locals.isOperador=1;
                req.app.locals.isTaxista=0;
                res.redirect('viajes');
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

