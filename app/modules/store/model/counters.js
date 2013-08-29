/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    db = $swift.extra('db');

exports.get = function(callback){
    if (!db._connected.read){
        callback(new errors.R1000());
        return;
    }
    db.read.keys('counters:*', function(err, results){
        if (err){
            callback(err);
        } else {
            var counters = [];
            for(var i = 0; i < results.length; i++){
                var el = results[i].split(':')[1];
                if (counters.indexOf(el) === -1){
                    counters.push(el);
                }
            }
            callback(null, counters);
        }
    });
};
