/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

'use strict';

angular.module('monitor')
    .factory('Refs', function($http, $q){

        return {
            getCounters: function (){
                var defer = $q.defer();

                $http.get('/counters').success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            getInstances: function (){
                var defer = $q.defer();

                $http.get('/instances').success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            }
        };
    });
