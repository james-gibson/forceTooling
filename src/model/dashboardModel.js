var conn = require('./ForceConnection.js').connection;

var init = function(apiModel) {
    apiModel.registerSecuredRoute('get'
        , 'dashboard'
        , '/dashboard'
        , dashboard
        , {
            'token':   {'required': true, 'dataType': 'string'}
        }
        , 'View dashboard');
}

var dashboard =function(req,res,next){
    res.render('dashboard', { title: 'Dashboard',token: req.query.token });
}



exports.init = init;
