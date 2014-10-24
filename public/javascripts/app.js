'use strict';

/* App Module */

var posManager = angular.module('posManager', [
    'ngRoute'
]);

posManager.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '',
                controller: 'HomeController'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
