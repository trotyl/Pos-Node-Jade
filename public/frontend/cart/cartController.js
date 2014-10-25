posApp.controller('CartController', ['$scope', '$location', '$route', '$routeParams', 'Cart',
    function($scope, $location, $route, $routeParams, Cart) {
        var initialize = function () {
            $scope.items = Cart.get();
            $scope.total = _($scope.items).reduce(function (sum, item) {
                return item.price * item.amount + sum;
            }, 0);
            console.log($scope.total);
        };
        initialize();

        $scope.alterAmount = function (item, theAmount, change) {
            Cart.alterAmount(item, theAmount, change);
            initialize();
        }
    }]);


