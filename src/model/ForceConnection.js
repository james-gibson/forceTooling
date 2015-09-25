var jsforce = require('jsforce');
var config = require('../../config.json');

var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : config.salesForceLoginURL
});

exports.connection = conn;