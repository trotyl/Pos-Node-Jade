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
                controller: 'ListController',
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
        return getStorage().length;
    };

    cart.get = function () {
        return getStorage();
    };

    cart.alterAmount = function (itemId, theAmount, change) {
        var cart = getStorage();
        var item = _(cart).find({ id: itemId });
        if(item) {
            item.amount = theAmount || (item.amount + change);
        }
        else {
            item = { id: itemId, amount: theAmount || change };
            cart.push(item);
        }
        if(item.amount <= 0) {
            _(cart).remove({ id: itemId });
        }
        setStorage(cart);
    };

    cart.available = function () {
        var delay = $q.defer();
        $http.get('/api/item/all').
            success(function (data) {
                delay.resolve(data);
            }).
            error(function () {
                delay.reject();
            });
        return delay.promise;
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



