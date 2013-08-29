/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

'use strict';

angular.module('monitor')
    .factory('Stat', function($http, $q){

        return {
            getAny: function (toLoad){
                var defer = $q.defer();

                $http.post('/stat', {data: toLoad}).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            }
        };
    });
