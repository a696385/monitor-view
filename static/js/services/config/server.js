/**
 * Powered by Andy <andy@away.name>
 * Date: 15.08.13
 */

'use strict';

angular.module('monitor')
    .factory('config.Server', function($http, $q){

        return {
            get: function (){
                var defer = $q.defer();

                $http.get('/config/server').success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            set: function (data){
                var defer = $q.defer();

                $http.post('/config/server', {data: data}).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            }
        };
    });