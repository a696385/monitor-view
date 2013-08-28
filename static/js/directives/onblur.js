/**
 * Powered by Andy <andy@away.name>
 * Date: 21.08.13
 */

angular
    .module('monitor')
    .directive('uiBlur', function ()
    {
        return function ( scope, elem, attrs )
        {
            elem.bind('blur', function ()
            {
                scope.$apply(attrs.uiBlur);
            });
        };
    })
;