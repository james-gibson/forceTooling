var colors = require('colors');

var config;
var activeLevels = {};
var levelColors = {
    INFO: colors.white,
    DEBUG: colors.green,
    WARN: colors.yellow,
    ERROR: colors.magenta,
    FATAL: colors.red
};

var canLog = function (logLevel) {
    return activeLevels[logLevel];
}

var init = function (cfg) {
    config = cfg || {};

    if (config.levels) {
        config.levels.forEach(function (logLevel) {
            activeLevels[logLevel.toUpperCase()] = true;
        });
    }

    if (config.colors) {
        config.colors.forEach(function (levelColor) {
            if (!colors[levelColor.color.toLowerCase()]) {
                throw new Error('Console color [' + levelColor.color.toLowerCase() + '] is not available.');
            } else {
                levelColors[levelColor.level.toUpperCase()] = colors[levelColor.color.toLowerCase()];
            }
        });
    }
};

var log = function (logLevel, message) {
    console.log(levelColors[logLevel](message));
};

exports.init = init;
exports.log = log;
exports.canLog = canLog;