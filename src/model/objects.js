"use strict";
var conn = require('./ForceConnection.js').connection;
var listCustomObjectsModel = require('./forceModel/listCustomObjects.js');
var listObjectsModel = require('./forceModel/listObjects.js');
var describeSObjectModel = require('./forceModel/describeSObject.js');
var logger = require('../services/logger.js');

var init = function(apiModel) {
    apiModel.registerSecuredRoute('get'
        , 'objects'
        , '/objects'
        , listObjects
        , {
            'token':   {'required': true, 'dataType': 'string'},
            'includeStandardObjects':   {'required': false, 'dataType': 'boolean'}
        }
        , 'JSON object description');

    apiModel.registerSecuredRoute('get'
        , 'objects'
        , '/objects/:objectName'
        , describeObject
        , {
            'token':   {'required': true, 'dataType': 'string'}
        }
        , 'JSON list of Objects');
}

var listObjects =function(req, res, next) {
    var includeStandardObjects = req.query.includeStandardObjects;

    var service = includeStandardObjects ? listObjectsModel : listCustomObjectsModel;

    service.init(conn);

    var p = service.execute();

    p.then(function(objects) {
        var objectMap = {};

        var results = objects.map(function(x) {
            var result = {};

            result.describeUri = '/objects/' + x.name + '?token=' + req.query.token;
            result.name = x.name;
            result.label = x.label;
            result.labelPlural = x.labelPlural;

            return result;
        });

        res.json(results)
    });
}

var describeObject =function(req, res, next) {
    var objectName = req.params.objectName;

    var service = describeSObjectModel;

    service.init(conn);

    var p = service.execute(objectName);

    p.then(function(objectDescription) {
        var result = objectDescription;
        result.parentUri = '/objects/?token=' + req.query.token;

        res.json(result)
    });
}

exports.init = init;
