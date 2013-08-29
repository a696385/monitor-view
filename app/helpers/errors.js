/**
 * Powered by Andy <andy@away.name>.
 * Date: 02.08.13
 */

var util = require('util');

module.exports = exports = {
    S1000: "Can not start swift",
    C1000: "Can not get config",
    C1001: "Can not set config",
    C1003: "Can not get counters",
    C1004: "Can not set counters",
    C1005: "Can not get instances",
    C1006: "Can not set instances",
    C1007: "Can not get blocks",
    C1008: "Can not set blocks",
    C1009: "Can not create block",
    C1010: "Can not remove block",
    C1011: "Can not sort blocks",
    C1012: "Can not get stat",
    R1000: "Redis not connected"
};

/**
 * Completed exports error wrapper
 * @param {String} code
 * @param {String} message
 * @param {Object} exception
 * @constructor
 */
var CompletedError = function(code, message, exception){
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.message = message;
    this.exception = exception;
};

util.inherits(CompletedError, Error);

/**
 * Overwrite toString method
 * @returns {String}
 */
CompletedError.prototype.toString = function(){
    var exp = this.exception;
    if (exp) {
        if (exp.code && exp.message) {
            exp = exp.toString(true);
        } else {
            exp = util.inspect(exp);
        }
    }
    return "#" + this.code + ": " + this.message + (exp != null? " (" + exp + ")": "");
};

/**
 * Return JSON Object
 * @returns {Object}
 */
CompletedError.prototype.toJSON = function(){
    var result = {
        code: this.code,
        message: this.message
    };
    if (this.exception != null){
        if (this.exception.toJSON != null){
            result.exception = this.exception.toJSON();
        } else {
            result.exception = this.exception.toString();
        }
    }
    return result;
};

/**
 * Create object for each error like {code: string, message: string, exception: objects}
 */
for(var key in exports) if (exports.hasOwnProperty(key)){
    var error = exports[key];
    (function(key, message) {
        exports[key] = function(e){
            return new CompletedError(key, message, e);
        };
    })(key, error);
}