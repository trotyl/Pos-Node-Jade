posApp.controller('ListController', ['$scope', '$location', '$route', '$routeParams', 'Cart', 'items',
    function($scope, $location, $route, $routeParams, Cart, items) {
        var initialize = function () {
            $scope.items = items;
        };
        initialize();

        $scope.buy = function (item) {
            Cart.alterAmount(item, null, 1);
        };
    }]);


