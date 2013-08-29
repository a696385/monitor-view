/**
 * Powered by Andy <andy@away.name>
 * Date: 15.08.13
 */

var routes = {
    index: {
        uri:            '/',
        templateUrl:    './template/index.html',
        controller:     'HomeCtrl',
        access:         routingConfig.accessLevels.public
    },
    404: {
        uri:            '/404',
        templateUrl:    './template/404.html',
        access:         routingConfig.accessLevels.public
    }
};


angular.module('monitor', [
        //'ngCookies',
        'ui.sortable',
        //'ui.bootstrap.popover',
        //'ui.bootstrap.accordion',
        //'ui.bootstrap.typeahead',
        'ui.bootstrap.dialog',
        'ui.bootstrap.alert',
        //'ui.bootstrap.datepicker',
        //'ui.bootstrap.dropdownToggle',
        'ui.select2'
    ])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$dialogProvider', function ($routeProvider, $locationProvider, $httpProvider, $dialogProvider) {
        $dialogProvider.options({
            backdrop: false,
            dialogClass: 'modal',
            dialogOpenClass: 'modal-open',
            backdropFade: true,
            dialogFade: true
        });

        var access = routingConfig.accessLevels;

        for(var key in routes) if (routes.hasOwnProperty(key)){
            var route = routes[key];
            $routeProvider.when(route.uri, route);
        }

        $routeProvider.otherwise({redirectTo:'/404'});

        $locationProvider.html5Mode(false);

        var interceptor = ['$location', '$q', function($location, $q) {
            function success(response) {
                if (typeof response.data === 'object'){
                    if (response.data.error){
                        response.data = response.data.error;
                        return $q.reject(response);
                    } else {
                        response.data = response.data.result;
                        return response;
                    }
                }
                return response;
            }

            function error(response) {

                if (typeof response.data === 'object'){
                    response.data = response.data.error;
                }
                if(response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
            return function(promise) {
                return promise.then(success, error);
            }
        }];

        $httpProvider.responseInterceptors.push(interceptor);

    }])

    .value('uiSortableConfig', {
        placeholder: 'placeholder',
        handle: '.handle',
        forcePlaceholderSize: true,
        distance: 12
    })

    .run(['$rootScope', '$location', '$timeout', '$dialog', 'config.Server', function ($rootScope, $location, $timeout, $dialog, configServer) {

        $rootScope.getUri = function(route, hash){
            if (hash == null) hash = true;
            return (hash ? "#" : "") + routes[route].uri;
        };
        $rootScope.getUriById = function(route, id, hash){
            if (hash == null) hash = true;
            return $rootScope.getUri(route, hash).replace(':id', id);
        };

        $rootScope.connection = null;
        $rootScope.selectServer = function(){
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
                        $rootScope.connection = result;
                        console.log('Server config saved');
                    }, function(err){
                        $rootScope.showError(err);
                        console.error(err);
                    });
                }
            });
        };
        $rootScope.disconnect = function(){
            configServer.set(null).then(function(data){
                $rootScope.connection = null;
                console.log('Server config saved');
            }, function(err){
                $rootScope.showError(err);
                console.error(err);
            });
        };

        configServer.get().then(function(data){
            $rootScope.connection = data;
        }, function(err){
            $rootScope.showError(err);
            console.error(err);
        });

        $timeout(function(){
            $rootScope.hideSplash = true;
        }, 1000);
    }]);
