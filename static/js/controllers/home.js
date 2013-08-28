/**
 * Powered by Andy <andy@away.name>
 * Date: 15.08.13
 */

angular.module('monitor')
    .controller('HomeCtrl',
        ['$rootScope', '$scope', '$q', '$http', '$location', '$dialog', 'config.Server', function($rootScope, $scope, $q, $http, $location, $dialog, configServer) {
            $scope.connection = null;
            $scope.selectServer = function(){
                var d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    templateUrl: 'template/components/server.select.html',
                    controller: 'ServerSelectCtrl'
                });
                d.open().then(function(result){
                    if(result){
                        configServer.set(result).then(function(data){
                            $scope.connection = result;
                            console.log('Server config saved');
                        }, function(err){
                            $rootScope.showError(err);
                            console.error(err);
                        });
                    }
                });
            };
            $scope.disconnect = function(){
                configServer.set(null).then(function(data){
                    $scope.connection = null;
                    console.log('Server config saved');
                }, function(err){
                    $rootScope.showError(err);
                    console.error(err);
                });
            };

            configServer.get().then(function(data){
                $scope.connection = data;
            }, function(err){
                $rootScope.showError(err);
                console.error(err);
            });

            $scope.chartEdit = function(index){
                var chart = $scope.blocks[index];
                $rootScope.editedChart = chart;
                var d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    templateUrl: 'template/components/chart.properties.html',
                    controller: 'ChartPropertiesCtrl'
                });
                d.open().then(function(result){
                    if (result){
                        chart.size = {
                            cel: result.width,
                            row: result.height
                        };
                        chart.title = result.title;
                        chart.subtitle = result.subtitle;

                    }
                });
            };

            $scope.blocks = [];

            $scope.blocks.push({
                size: {
                    cel: 1,
                    row: 1
                },
                title: "New Chart",
                subtitle: null,
                counters: ["CPU", "Memory"],

                data: null
                /*data: {
                    "title": {
                        "text": "Israel love Iran"
                    },
                    "subtitle": {
                        "text": "Source: <a href=\"https://www.facebook.com/israellovesiran\">Israel loves iran on fb</a>"
                    },
                    "xAxis": {
                        "labels": {}
                    },
                    "tooltip": {},
                    "plotOptions": {
                        "area": {
                            "pointStart": 1940,
                            "marker": {
                                "enabled": false,
                                "symbol": "circle",
                                "radius": 2,
                                "states": {
                                    "hover": {
                                        "enabled": true
                                    }
                                }
                            }
                        }
                    },
                    "series": [
                        {
                            "name": "Israel",
                            "data": [
                                400,
                                194,
                                301,
                                130,
                                300
                            ]
                        },
                        {
                            "name": "Iran",
                            "data": [
                                123,
                                325,
                                120,
                                300,
                                300
                            ]
                        }
                    ]
                }     */
            });

            $scope.sortableOptions = {
                stop: function(e, ui){
                    console.log('sorted');
                }
            };

        }]);

angular.module('monitor').controller('ServerSelectCtrl',function($scope, dialog) {
    $scope.result = {
        host: "localhost",
        port: 6379
    };
    $scope.close = function(isOk, result){
        dialog.close((isOk ? result : null));
    };
});


angular.module('monitor').controller('ChartPropertiesCtrl',function($scope, $rootScope, dialog) {

    $scope.options = {
        height: [1, 2],
        width: [1, 2]
    };
    $scope.result = {
        width: $rootScope.editedChart.size.cel,
        height: $rootScope.editedChart.size.row,
        title: $rootScope.editedChart.title,
        subtitle: $rootScope.editedChart.subtitle
    };
    $scope.close = function(isOk, result){
        dialog.close((isOk ? result : null));
    };
});
