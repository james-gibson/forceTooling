var listObjects = require('./listObjects.js');
var conn;
function init(connection){
    if (!connection && !this.conn) this.conn = require('../ForceConnection.js').connection;
    else { conn = connection;}
    listObjects.init(conn);
}

function execute(){
    var promise = new Promise(function(resolve, reject){
        if(!conn) {reject('Invalid Force.com connection');}

        var results = [];
        function isCustomObject(value){
            if(String(value.name).indexOf('__c') > -1) {return value;}
        }
        listObjects.execute()
            .then(
                function(x){
                    results = x.map(isCustomObject)
                               .filter(function(n){ return n != undefined });

                    var pendingDescribes = results.map(function(x) {
                        var describePromise = new Promise(function(resolve, reject) {
                            console.log('Getting: '+x.name);
                            conn.sobject(x.name).describe(function(err, meta) {
                                if (err) { reject(err); }
                                console.log('returning: '+meta);
                                resolve(meta);
                            });
                        });

                        return describePromise;
                    });

                    Promise.all(pendingDescribes).then(function(values) {
                        resolve(values);
                    });
                }
            )
    });

    return promise;
}

exports.init = init;
exports.execute = execute;