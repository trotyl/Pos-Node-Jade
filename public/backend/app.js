'use strict';

/* App Module */

var posManager = angular.module('posManager', ['ngRoute', 'ngResource']);

posManager.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/list/:page', {
                templateUrl: '/backend/home/home.html',
                controller: 'HomeController'
            }).
            when('/create', {
                templateUrl: '/backend/edit/edit.html',
                controller: 'EditController'
            }).
            when('/detail/:itemId', {
                templateUrl: '/backend/edit/edit.html',
                controller: 'EditController'
            }).
            when('/add_attribute/:itemId', {
                templateUrl: '/backend/addAttribute/addAttribute.html',
                controller: 'AddAttributeController'
            }).
            otherwise({
                redirectTo: '/list/1'
            });
    }]);

posManager.factory('Item', ['$resource',
    function($resource){
        return $resource('/api/item/:operation/:itemId', { itemId: '@id'}, {
            query: { method: 'GET', params: { operation: 'page' }, isArray: true },
            count: { method: 'GET', params: { operation: 'count' }, isArray: true }
        });
    }]);

