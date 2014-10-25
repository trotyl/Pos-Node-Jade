posApp.controller('CartController', ['$scope', '$location', '$route', '$routeParams', 'Cart',
    function($scope, $location, $route, $routeParams, Cart) {
        var initialize = function () {
            $scope.items = Cart.get();
        };
        initialize();

        $scope.alterAmount = function (item, theAmount, change) {
            Cart.alterAmount(item, theAmount, change);
            initialize();
        }
    }]);


