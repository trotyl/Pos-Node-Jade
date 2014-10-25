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
    var getStorage = function () {
        return JSON.parse(localStorage.getItem('cart')) || []
    };
    var setStorage = function (cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    cart.save = function () {
        var cart = getStorage();
        cart.push(this);
        setStorage(cart);
    };
    cart.count = function () {
        return getStorage().length;
    };
    cart.get = function () {
        return getStorage();
    };
    return cart;
});

