const path = require('path');

exports.dashboard = (req, res,next) => {
    if(req.session.user != undefined){
        res.render('dashboard',{title:"Inicio"});  
    }
    else{
        res.redirect('/');
    }
    
}

