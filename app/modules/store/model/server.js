/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    config = $swift.extra('config');

exports.get = function(callback){
    callback(null, config.data.server || null);
};

exports.set = function(data, callback){
    if (data){
        config.data.server = {
            host: data.host,
            port: data.port
        };
    } else {
        config.data.server = null;
    }
    config.save(callback);
};
