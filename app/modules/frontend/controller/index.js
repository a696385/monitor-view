/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    15.08.13
 * Time:    12:48
 */

var $swift = require('swift.mvc'),
    $path = require('path');

exports.indexAction = function ()
{
    this.get(function (req, res, next)
    {
        var fileName = $path.join($swift.configurator.getConfig().swift.path.project, 'static', 'index.html');
        res.sendfile(fileName);
    });
};