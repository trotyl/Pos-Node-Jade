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
                templateUrl: '/frontend/list/list.html',
                controller: 'ListController'
            }).
            when('/cart', {
                templateUrl: '/frontend/cart/cart.html',
                controller: 'CartController'
            }).
            when('/payment', {
                templateUrl: '/frontend/payment/payment.html',
                controller: 'PaymentController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

posApp.factory('Cart', function () {
    var cart = {};
    cart.save = function () {
        localStorage.setItem('cart', JSON.stringify(this));
    };
    cart.count = function () {
        return (JSON.parse(localStorage.getItem('cart')) || []).length;
    };
    cart.get = function () {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };
    return cart;
});

