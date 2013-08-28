/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */


var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    serverModel = $swift.require('[store]/model/server');

exports.serverAction = function(){
    this.get(function(req, res, next){
        serverModel.get(function(err, result){
            if (err){
                res.error(new errors.C1000(err));
            } else {
                res.success(result);
            }
        });
    });
    this.post(function(req, res, next){
        serverModel.set(req.param('data' || null), function(err){
            if (err){
                res.error(new errors.C1001(err));
            } else {
                res.success(true);
            }
        });
    });
};