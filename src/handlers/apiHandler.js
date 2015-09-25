var config = require('../../config.json');
var apiModel = require('../model/ApiModel.js');

var models = {
    "login" : require('../model/loginModel'),
    "dashboard": require('../model/dashboardModel')
}
function currentVersion(req,res) {
    var result = {
        version:"0.1",
        about:"This API acts as a gateway for disparate data sources",
        why:"Why not?",
        authentication: {URL:config.host +"api/authenticate",queryParameters:["user","key"]}
    };
    res.json(result);
}

function getRoutes(req,res) {
    var urls = [];

    for (var route in apiRoutes) {
        var url = {};
        url[route] = {
            'description': apiRoutes[route].description
            , 'parameters': apiRoutes[route].parameters
        };

        urls.push(url);
    }

    res.json(urls);
}

function setup(app) {
    apiModel.routeRegistered.on('registeredSuccessfully', function (route) {
        if(!route.method) {
            // throw error
        } else {
            preRegisterRoute(route);
            app[route.method](route.pattern, route.handler);
        }
    });

    apiModel.routeRegisteredError.on('registrationError', function (route) {
        console.log('Unable to register route:', route);
    });

    setupRoutes();
}

function preRegisterRoute(route) {
    var tempRoute = route;

    if (config.logRouteRegistration) {
        console.log(JSON.stringify(tempRoute));
    }
}

function setupRoutes() {
    for(var prop in models){
        models[prop].init(apiModel);
    }
    //Not sure if these should be in this class
    apiModel.registerPublicRoute('get', 'displayCurrentVersion', '', currentVersion, null, 'Gets the current API version information.');
    apiModel.registerPublicRoute('get', 'displayAvailableRoutes', '/routes/', getRoutes, null, 'Displays the available routes.');
    apiModel.registerPublicRoute('get', 'test', '/test', getRoutes, {'param1': {'required': true, 'dataType': 'blob'}}, 'Test Description');
}

exports.setup = setup;