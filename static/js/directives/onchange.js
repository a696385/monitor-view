/**
 * Powered by Andy <andy@away.name>
 * Date: 21.08.13
 */

angular
    .module('monitor')
    .directive('uiChange', function ()
    {
        return function ( scope, elem, attrs )
        {
            elem.bind('change', function ()
            {
                scope.$apply(attrs.uiChange);
            });
        };
    })
;