/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

angular.module('monitor').controller('ChartPropertiesCtrl',function($scope, $rootScope, Refs, dialog) {
    $scope.refs = {
        counters: [],
        instances: []
    };

    Refs.getCounters().then(function(result){
        $scope.refs.counters = [];
        result.forEach(function(el){
            $scope.refs.counters.push(el);
        });
        Refs.getInstances().then(function(result){
            $scope.refs.instances = [];
            result.forEach(function(el){
                $scope.refs.instances.push(el);
            });

            $scope.options = {
                height: [1, 2],
                width: [1, 2]
            };
            $scope.result = {
                width: $rootScope.editedChart.size.cel,
                height: $rootScope.editedChart.size.row,
                title: $rootScope.editedChart.title,
                subtitle: $rootScope.editedChart.subtitle,
                series: $rootScope.editedChart.series
            };
        }, function(err){
            $rootScope.showError(err);
            console.error(err);
        });

    }, function(err){
        $rootScope.showError(err);
        console.error(err);
    });



    $scope.close = function(isOk, result){
        dialog.close((isOk ? result : null));
    };

    $scope.addSeries = function(){
        $scope.result.series.push({counter: null, instance: null, color: "#AAAAAA"});
    };

    $scope.removeSeries = function(index){
        $scope.result.series.splice(index, 1);
    };
});

