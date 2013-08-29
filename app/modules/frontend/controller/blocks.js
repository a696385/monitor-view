/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    blockModel = $swift.require('[store]/model/blocks');

exports.indexAction = function(){
    this.get(function(req, res, next){
        blockModel.get(function(err, result){
            if (err){
                res.error(new errors.C1007(err));
            } else {
                res.success(result);
            }
        });
    });

    this.put(function(req, res, next){
        blockModel.create(req.param('data', {}), function(err, result){
            if (err){
                res.error(new errors.C1009(err));
            } else {
                res.success(result);
            }
        });
    });

    this.post(function(req, res, next){
        blockModel.sort(req.param('data', []), function(err, result){
            if (err){
                res.error(new errors.C1011(err));
            } else {
                res.success(result);
            }
        });
    });
};

exports.byIdAction = function(){
    this.post(function(req, res, next){
        blockModel.set(req.param('id'), req.param('data', {}), function(err, result){
            if (err){
                res.error(new errors.C1008(err));
            } else {
                res.success(result);
            }
        });
    });
    this.delete(function(req, res, next){
        blockModel.remove(req.param('id'), function(err, result){
            if (err){
                res.error(new errors.C1010(err));
            } else {
                res.success(result);
            }
        });
    });
};
