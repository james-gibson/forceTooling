var express = require('express');
var router = express.Router();
var conn = require('ForceConnection').connection;

var apiModel = require('../models/ApiModel.js');


/* GET users listing. */
router.get('[/]?', function(req, res, next) {
    var user = req.query.user;
    var password = req.query.password;

    console.log(user,password);

    conn.login(user, password, function(err, userInfo) {
        if (err) { return console.error(err); }
        res.redirect('/admin/?token=' + conn.accessToken);
    });
});

var login = function(req,res,next){

}

apiModel.registerPublicRoute('get'
                            , 'login'
                            , '/login'
                            , login
                            , {
                                  'user':   {'required': true, 'dataType': 'string'}
                                ,'password':{'required': true, 'dataType': 'string'}
                            }
                            , 'Login to a salesforce org');

module.exports = router;
