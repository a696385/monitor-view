/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    $async = require('async'),
    errors = $swift.require(':app/helpers/errors'),
    db = $swift.extra('db');

exports.get = function(data, callback){
    if (!db._connected.read){
        callback(new errors.R1000());
        return;
    }
    data = data || [];
    var result = {};
    $async.each(data, function(el, next){

        var id = el.id,
            lastLoad = (el.lastLoad != null ? new Date(el.lastLoad) : null),
            group = 'counters:' + el.counter + ':' + el.instance + ':';
        if (lastLoad != null) lastLoad.setMilliseconds(0);
        if (result[id] == null) result[id] = {id: id, data: []};

        db.read.keys(group + '*', function(err, keys){
            if (err){
                next(err);
                return;
            }

            $async.each(keys, function(key, next){

                var date = new Date(key.substring(group.length));
                date.setMilliseconds(0);
                if (lastLoad != null && lastLoad > date) {
                    next();
                    return;
                }

                db.read.get(key, function(err, val){
                    if (err){
                        next(err);
                        return;
                    }

                    result[id].data.push({date: date, value: parseFloat(val)});
                    next();
                });

            }, next);

        });

    }, function(err){
        var res = [];
        for(var key in result) if (result.hasOwnProperty(key)){
            result[key].data = result[key].data.sort(function(a,b){
                if (a.date > b.date) {
                    return 1;
                } else if (a.date < b.date) {
                    return -1;
                } else {
                    return 0;
                }
            });
            res.push(result[key]);
        }
        callback(err, res);
    })
};
