/**
 * Powered by Andy <andy@away.name>
 * Date: 15.08.13
 */

angular.module('monitor')
    .controller('HomeCtrl',
        ['$rootScope', '$scope', '$q', '$http', '$location', '$dialog', '$timeout', 'Refs', 'Blocks', 'Stat', function($rootScope, $scope, $q, $http, $location, $dialog, $timeout, Refs, Blocks, Stat) {

            $scope.chartEdit = function(index){
                var chart = $scope.data.blocks[index];
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
                        chart.series = [].concat(result.series);
                        Blocks.set(chart.id, {
                            size: {
                            cel: result.width,
                            row: result.height
                            },
                            title: result.title,
                            subtitle: result.subtitle,
                            series: [].concat(result.series)
                        }).then(function(result){
                                createDataForChart(chart);
                        }, function(err){
                            $rootScope.showError(err);
                            console.error(err);
                        });
                    }
                });
            };

            $scope.data = {
                blocks: []
            };

            $scope.sortableOptions = {
                stop: function(e, ui){
                    var ids = $scope.data.blocks.map(function(el){ return el.id; });
                    Blocks.sort(ids).then(function(data){
                        console.log('sorted: ', $scope.data.blocks.map(function(el){ return el.title; }))
                    },function(err){
                        $rootScope.showError(err);
                        console.error(err);
                    });
                }
            };

            $scope.addBlock = function(){
                var block = {
                    size: {
                        cel: 1,
                        row: 1
                    },
                    title: "New Chart " +  ($scope.data.blocks.length + 1),
                    subtitle: null,
                    series: [],
                    data: null
                };
                Blocks.create(block).then(function(data){
                    block.id = data.id;
                    $scope.data.blocks.push(block);
                    createDataForChart(block);
                }, function(err){
                    $rootScope.showError(err);
                    console.error(err);
                });
            };

            Blocks.get().then(function(result){
                for(var i = 0; i < result.length; i++){
                    $scope.data.blocks.push(result[i]);
                    createDataForChart(result[i]);
                }
            }, function(err){
                $rootScope.showError(err);
                console.error(err);
            });

            $scope.chartRemove = function(index){
                Blocks.remove($scope.data.blocks[index].id).then(function(){
                    $scope.data.blocks.splice(index, 1);
                }, function(err){
                    $rootScope.showError(err);
                    console.error(err);
                });
            };

            $scope.$on('add-chart', function(){
                $scope.addBlock();
            });

            var dataInfo = {};

            var createDataForChart = function(block){
                var chartColors = [];
                var options = {
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg,
                        marginRight: 25,
                        marginBottom: 55,
                        events: {
                            load: function(){
                                var self = this;
                                var interval = function() {
                                    if (self == null || self.series == null) {
                                        return;
                                    }
                                    for(var i = 0; i < self.series.length; i++){
                                        var series = self.series[i];
                                        if (dataInfo[block.id] == null) continue;
                                        var newData = [].concat(dataInfo[block.id].data[i] || []);
                                        newData.forEach(function(data){
                                            var x = data.date.getTime(),
                                                y = data.value;
                                            series.addPoint([x, y]);
                                        });
                                        dataInfo[block.id].data[i] = [];
                                    }
                                    setTimeout(interval, 1000);
                                };
                                interval();
                            }
                        }
                    },
                    rangeSelector: {
                        buttons: [],
                        inputEnabled: false,
                        selected: 0
                    },
                    title: {
                        text: block.title,
                        x: -20
                    },
                    subtitle: {
                        text: block.subtitle || ''
                    },
                    colors: chartColors,
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 150,
                        showLastTickLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Value'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    /*plotOptions: {
                        spline: {
                            lineWidth: 4,
                            states: {
                                hover: {
                                    lineWidth: 5
                                }
                            },
                            marker: {
                                enabled: false
                            }
                        }
                    },*/
                    legend: {
                        enabled: true
                    },
                    exporting: {
                        enabled: false
                    },
                    series: []
                };
                block.series.forEach(function(el){
                    options.series.push({
                        name: el.instance + ': ' + el.counter,
                        data: [],
                        tooltip: {
                            valueDecimals: 0
                        }
                    });
                    chartColors.push(el.color);
                });
                block.data = options;
            };

            var loadData = function(callback){
                var toLoad = [], fromLoad = {};
                var forId = 0;
                ($scope.data.blocks || []).forEach(function(block){
                    if (block.data == null) return;
                    for(var i = 0; i < block.series.length; i++){
                        var series = block.series[i],
                            info = dataInfo[block.id] || {};
                        var obj = {
                            counter: series.counter,
                            instance: series.instance,
                            lastLoad: null,
                            id: forId++
                        };
                        fromLoad[obj.id] = {
                            block: block,
                            seriesIndex: i
                        };
                        if (info.lastObject != null){
                            obj.lastLoad = info.lastObject.date;
                        } else {
                            obj.lastLoad = new Date();
                        }
                        toLoad.push(obj);
                    }

                });
                if (toLoad.length === 0){
                    callback();
                    return;
                }

                Stat.getAny(toLoad).then(function(result){

                    for(var i = 0; i < result.length; i++){
                       var id = result[i].id,
                           dist = fromLoad[id],
                           data = result[i].data;
                        if (dataInfo[dist.block.id] == null){
                            dataInfo[dist.block.id] = {
                                lastObject: {date: new Date(), value: 0},
                                data: {}
                            }
                        }
                        for(var j = 0; j < data.length; j++){
                            if (dataInfo[dist.block.id].data[dist.seriesIndex] == null) dataInfo[dist.block.id].data[dist.seriesIndex] = [];

                            var arr = dataInfo[dist.block.id].data[dist.seriesIndex];

                            arr.push({date: new Date(data[j].date), value: data[j].value});
                            dataInfo[dist.block.id].lastObject = arr[arr.length-1];
                        }

                    }
                    callback();

                }, function(err){
                    $rootScope.showError(err);
                    console.error(err);
                });
            };

            var mainLoop = function(){
                loadData(function(){
                    $timeout(mainLoop, 1000);
                });
            };
            mainLoop();


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
