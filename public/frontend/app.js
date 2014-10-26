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

posApp.factory('Cart', ['$http', '$q', function ($http, $q) {
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
        return _(getStorage()).reduce(function (sum, item) {
            return sum + item.amount;
        }, 0);
    };

    cart.get = function () {
        return getStorage();
    };

    cart.alterAmount = function (remoteItem, theAmount, change) {
        var cart = getStorage();
        var item = _(cart).find({ id: remoteItem.id });
        if(item) {
            item.amount = theAmount || (item.amount + change);
        }
        else {
            item = remoteItem;
            item.amount = change;
            cart.push(item);
        }
        if(item.amount <= 0) {
            _(cart).remove({ id: item.id });
        }
        setStorage(cart);
    };

    cart.available = function () {
        return $http.get('/api/item/all');
    };

    return cart;
}]);

posApp.filter('sumDisplay', function () {
    return function (input) {
        return input.toFixed(2);
    };
});

posApp.filter('giftDisplay', function () {
    return function (input) {
        return input.toFixed(2);
    };
});

posApp.filter('getType', function () {
    return function (input) {
        return _(input).find({ name: '类型' }) || '无';
    };
});



