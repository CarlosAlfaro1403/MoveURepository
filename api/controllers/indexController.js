const path = require('path');

exports.dashboard = (req, res,next) => {
    if(req.session.user != undefined){
        res.render('dashboard',{title:"Inicio"});  
    }
    else{
        res.redirect('/');
    }
}

exports.dashboardT = (req, res,next) => {
    if(req.session.user != undefined){
        res.render('./dashboard/dashboardT',{title:"Inicio"});  
    }
    else{
        res.redirect('/');
    } 
}

exports.dashboardO = (req, res,next) => {
    if(req.session.user != undefined){
        res.render('./dashboard/dashboardO',{title:"Inicio"});  
    }
    else{
        res.redirect('/');
    } 
}
