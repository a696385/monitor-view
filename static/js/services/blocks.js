/**
 * Powered by Andy <andy@away.name>
 * Date: 29.08.13
 */

'use strict';

angular.module('monitor')
    .factory('Blocks', function($http, $q){

        return {
            get: function (){
                var defer = $q.defer();

                $http.get('/blocks').success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            create: function (data){
                var defer = $q.defer();

                $http.put('/blocks', {data: data}).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            set: function (id, data){

                var defer = $q.defer();

                $http.post('/blocks/' + id, {data: data}).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            remove: function (id){

                var defer = $q.defer();

                $http.delete('/blocks/' + id).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            },
            sort: function (data){
                var defer = $q.defer();

                $http.post('/blocks', {data: data}).success(function (response){
                    defer.resolve(response);
                }).error(defer.reject);

                return defer.promise;
            }
        };
    });
