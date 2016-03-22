"use strict";
var conn = require('./ForceConnection.js').connection;
var listCustomObjects = require('./forceModel/listCustomObjects.js');
var describeSObject = require('./forceModel/describeSObject.js');

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

var dashboard =function(req, res, next) {
    listCustomObjects.init(conn);
    
    //describeSObject.init(conn);
    function render(result) {
        //var a = describeSObject.execute(result[0].name);
        res.render('dashboard', {
            title: 'Dashboard',
            token: req.query.token,
            objects: result
        });
    }
    var p = listCustomObjects.execute();

    p.then(function(objects) {
        var objectMap = {};

        objects.map(function(x) {
            console.log(x.name);
            if (!objectMap[x.name]) {
                objectMap[x.name] = x;
            }
        });

        var results = objects.map(function(x) {
            var customChildren = [];
            for (var i  in x.childRelationships) {
                if (objectMap[x.childRelationships[i].childSObject]) {
                    customChildren.push(x.childRelationships[i]);
                }
            }
            x.childRelationships = customChildren;
            return x;
        });

        render(results)
    });
}

exports.init = init;
