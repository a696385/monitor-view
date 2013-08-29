/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

var $swift = require('swift.mvc'),
    $async = require('async'),
    errors = $swift.require(':app/helpers/errors'),
    db = $swift.extra('db');

exports.get = function(callback){
    if (!db._connected.read){
        callback(new errors.R1000());
        return;
    }
    db.read.keys('instance:*', function(err, results){
        if (err){
            callback(err);
        } else {
            var instances = [];
            $async.each(results, function(el, next){

               var obj = {
                   name: el.split(':')[1],
                   description: ""
               };

                db.read.get('instance:' + obj.name + ':description', function(err, result){
                    if (err){
                        next(err);
                    } else {
                        obj.description = result || "";
                        instances.push(obj);
                        next();
                    }
                });

            }, function(err){
                callback(err, instances);
            });
        }
    });
};