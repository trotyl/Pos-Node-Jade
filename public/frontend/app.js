'use strict';

/* App Module */

var posApp = angular.module('posApp', ['ngRoute', 'ngResource']);

posApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'frontend/home/home.html',
                controller: 'HomeController'
            }).
            when('/list', {
                templateUrl: '/backend/list/list.html',
                controller: 'ListController'
            }).
            when('/cart', {
                templateUrl: '/backend/cart/cart.html',
                controller: 'CartController'
            }).
            when('/payment', {
                templateUrl: '/backend/payment/payment.html',
                controller: 'PaymentController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);



