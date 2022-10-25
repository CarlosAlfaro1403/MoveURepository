var pool = require('../database/conexion');

exports.login = (req, res) => {
    res.render('login');
}

exports.auth = async(req,res)=>{
    
    const user = await pool.query('SELECT * FROM public.usuario WHERE nombre_usuario = $1',[req.body.usuario]);
    req.session.user=req.body.usuario;
    if(user.rowCount > 0){
        if(user.rows[0].password == req.body.password){
            usuario=req.session.user;
            res.redirect('/dashboard');
        }
        else
        {
            res.render('login',{message:'Contraseña no valido'});
        }
    }
    else
    {
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

