angular.module('posManager').controller('NavController', ['$scope', '$location', '$route', '$routeParams',
    function($scope, $location, $route, $routeParams) {

        var initialize = function () {

        };
        initialize();

        $scope.goHome = function () {
            $location.path('/');
        };

        $scope.goToPromotion = function () {
            $location.path('/promotion');
        };

    }]);


