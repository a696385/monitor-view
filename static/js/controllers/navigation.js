/**
 * Powered by Andy <andy@away.name>
 * Date: 16.08.13
 */

angular.module('monitor')
    .controller('NavigationCtrl',
        ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
            $scope.isIndex = false;

            $rootScope.$on('$routeChangeSuccess', function(event, current){
                $scope.isIndex = ($location.path() === routes.index.uri);
            });

        }]);

