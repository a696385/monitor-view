/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    statModel = $swift.require('[store]/model/stat');

exports.indexAction = function(){
    this.post(function(req, res, next){
        statModel.get(req.param('data', {}), function(err, result){
            if (err){
                res.error(new errors.C1012(err));
            } else {
                res.success(result);
            }
        });
    });
};