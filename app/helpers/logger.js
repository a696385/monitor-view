/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    10.06.13
 * Time:    13:01
 */

var $swift = require('swift.mvc'),
    $util = require('util');

/**
 * Convert anything to text
 * @param {*} s
 * @returns {String}
 */
var sourceToText = function(s){
    var text = s;
    if (text instanceof Error){
        text = text.toString() + '\n\n' + text.stack;
    } else if (typeof text === 'object') {
        text = $util.inspect(text);
    } else {
        text = text.toString();
    }
    return text;
};

/**
 * Логирование
 *
 * @param {String} loggerName логгер
 * @param {String|Object} text текст для записи в лог-файл
 */
exports.log = function log (loggerName, text){
    var logger = $swift.loggerManager.getLogger(loggerName);
    if (!logger) {
        console.error('Logger not found - ' + loggerName + '!');
        return;
    }
    logger.log('\n\n' + (new Date()) + ':   ' + sourceToText(text));
    if (process.env.NODE_ENV !== 'production'){
        exports.debug(loggerName + '    ' + sourceToText(text));
    }
};

/**
 * Print debug info to console
 * @param {String|Object} text  текст для записи
 */
exports.debug = function(text){
    console.log('' + (new Date()) + ':   ' + sourceToText(text));
};