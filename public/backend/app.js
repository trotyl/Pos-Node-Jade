'use strict';

/* App Module */

var posManager = angular.module('posManager', ['ngRoute', 'ngResource']);

posManager.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/backend/home/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

posManager.factory('Item', ['$resource',
    function($resource){
        return $resource('api/item/:id', {}, {
            query: { method: 'GET', params: { id: 'ITEM0000' }, isArray: true }
        });
    }]);
