/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

angular.module('monitor')

    .directive('chart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                chartData: "=chartData",
                chartType: "=chartType",
                chartHeight: "=chartHeight"
            },
            transclude:true,
            replace: true,

            link: function (scope, element, attrs) {
                $(element[0]).height(scope.chartHeight || 400);
                var chartsDefaults = {
                    chart: {
                        //renderTo: element[0],
                        type: attrs.type || null,
                        height: attrs.height || null,
                        width: attrs.width || null
                    }
                };

                //Update when charts data changes
                scope.$watch(function() { return scope.chartData; }, function(value) {
                    if(!value) return;

                    var deepCopy = true;
                    var newSettings = {};
                    $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
                    var chart = $(element[0]).highcharts();
                    if (chart) chart.destroy();

                    if (!scope.chartType){
                        $(element[0]).highcharts(newSettings);
                    } else {
                        $(element[0]).highcharts(scope.chartType, newSettings);
                    }
                });
            }
        };

    });
