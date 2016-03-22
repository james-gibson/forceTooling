"use strict";
var conn = require('../ForceConnection.js').connection;
var fs = require('fs');
function init(connection) {
    if (connection) this.conn = connection;
}

function execute() {
    var promise = new Promise(function(resolve, reject) {
        if (!conn) {reject('Invalid Force.com connection');}

        conn.describeGlobal$(function(err, res) {
            if (err) { return promise.reject(err); }
            var results = [];
            res.sobjects.forEach(function(x) {results.push(x)});

             resolve(results);
        });
    });
    return promise;
}

exports.init = init;
exports.execute = execute;