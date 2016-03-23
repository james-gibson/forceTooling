var curry = require('curry');

var LEVEL = {
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARN: 'WARN',
    ERROR: 'ERROR',
    FATAL: 'FATAL'
};

var config;
var loggers = [];

var loadLogger = function (loggerConfig) {
    var logger = require('../loggers/' + loggerConfig.name + '.logger.js');

    if (logger.init) {
        logger.init(loggerConfig);
    }

    loggers.push(logger);
};

var init = function (cfg) {
    if (config) return;

    config = cfg || {};

    if (config.loggers) {
        config.loggers.forEach(function (loggerConfig) {
            loadLogger(loggerConfig);
        });
    }
};

var log = curry(function (logLevel, message) {
    if (!loggers || !(loggers instanceof Array)) return;

    loggers.forEach(function (logger) {
        if (logger.canLog(logLevel)) {
            logger.log(logLevel, message);
        }
    });
});

exports.init = init;
exports.info = log(LEVEL.INFO);
exports.debug = log(LEVEL.DEBUG);
exports.warn = log(LEVEL.WARN);
exports.error = log(LEVEL.ERROR);
exports.fatal = log(LEVEL.FATAL);