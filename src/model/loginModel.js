var conn = require('./ForceConnection.js').connection;
var logger = require('../services/logger.js');

var init = function(apiModel) {
    apiModel.registerPublicRoute('get'
        , 'login'
        , '/login'
        , login
        , {
            'user':   {'required': true, 'dataType': 'string'}
            , 'password':{'required': true, 'dataType': 'string'}
        }
        , 'Login to a salesforce org');
}


/* GET users listing. */
//router.get('[/]?', function(req, res, next) {
//
//});

var login = function(req, res, next) {
    var user = req.query.user;
    var password = req.query.password;

    conn.login(user, password, function(err, userInfo) {
        if (err) {
            logger.error(err);
            res.redirect('/');
            return;
        }
        res.redirect('/dashboard/?token=' + conn.accessToken);
    });
}


exports.init = init;



