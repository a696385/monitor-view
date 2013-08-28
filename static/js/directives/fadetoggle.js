/**
 * Powered by Andy <andy@away.name>
 * Date: 26.08.13
 */

angular
    .module('monitor')
    .directive('uiFadeToggle', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.uiFadeToggle, function(val, oldVal) {
                    if(val === oldVal) return;
                    element[val ? 'fadeIn' : 'fadeOut']("normal");
                });
            }
        }
    });