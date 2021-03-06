/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    counterModel = $swift.require('[store]/model/counters');

exports.indexAction = function(){
    this.get(function(req, res, next){
        counterModel.get(function(err, result){
            if (err){
                res.error(new errors.C1005(err));
            } else {
                res.success(result);
            }
        });
    });
};
