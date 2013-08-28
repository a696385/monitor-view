/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    20.08.13
 * Time:    13:01
 */

angular
    .module('monitor')
    .controller('AlertCtrl', [
        '$rootScope', '$scope', '$timeout',
        function($rootScope, $scope, $timeout)
        {
            var id = 0;
            $scope.alerts = [];
            $scope.closeAlert = function(id) {
                for(var i = 0; i < $scope.alerts.length; i++){
                    if ($scope.alerts[i].id === id){
                        $scope.alerts.splice(i, 1);
                        break;
                    }
                }
            };
            $rootScope.$on('alert', function(event, type, message){
                var currentId = ++id;
                var index = $scope.alerts.push({type: type, msg: message, id: currentId});
                if (type !== 'danger' && type !== 'warning'){
                    $timeout(function(){
                        $scope.closeAlert(currentId);
                    }, 2000);
                }
            });
            $rootScope.showError = function(msg){
                if (msg == ""){
                    msg = "System error, check internet connection"
                }
                if (typeof msg === 'object' && msg.code != null){
                    if (msg.code === "A1000") return;
                    msg = msg.message + (msg.exception != null ? '(' + msg.exception + ')' : '');
                }
                $rootScope.$broadcast('alert', 'danger', msg);
            };

            $rootScope.showInfo = function(msg){
                $rootScope.$broadcast('alert', 'info', msg);
            };

            $rootScope.showWarning = function(msg){
                $rootScope.$broadcast('alert', 'warning', msg);
            };

            $rootScope.showSuccess = function(msg){
                $rootScope.$broadcast('alert', 'success', msg);
            };
        }
    ])
;