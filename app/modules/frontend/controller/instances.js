/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    instanceModel = $swift.require('[store]/model/instances');

exports.indexAction = function(){
    this.get(function(req, res, next){
        instanceModel.get(function(err, result){
            if (err){
                res.error(new errors.C1003(err));
            } else {
                res.success(result);
            }
        });
    });
};
