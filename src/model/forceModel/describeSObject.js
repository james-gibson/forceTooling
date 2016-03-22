var listCustomObjects = require('./listCustomObjects.js');
var conn;
function init(connection) {
    if (!connection && !this.conn) {
        this.conn = require('../ForceConnection.js').connection;
    } else {
        conn = connection;
    }
    listCustomObjects.init(conn);
}

function execute(sObjectName) {
    var promise = new Promise(function(resolve, reject) {
        if (!conn) {
            reject('Invalid Force.com connection');
        }

        var results = [];

        conn.sobject(sObjectName).describe$(function(err, meta) {
            if (err) {
                reject(err);
            }

            resolve(meta);
        });
    });

    return promise;
}

exports.init = init;
exports.execute = execute;