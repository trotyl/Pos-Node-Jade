posApp.controller('NavController', ['$scope', '$location', '$route', '$routeParams', 'Cart',
    function($scope, $location, $route, $routeParams, Cart) {

        var initialize = function () {
            var path = $location.path();
            $scope.active = {
                home: path === '/',
                list: path === '/list',
                cart: path === '/cart',
                payment: path === '/payment'
            };
            $scope.counter = Cart.count();
        };
        initialize();

        $scope.goHome = function () {
            $location.path('/');
        };

        $scope.goToList = function () {
            $location.path('/list');
        };

        $scope.goToCart = function () {
            $location.path('/cart');
        };

        $scope.goToPayment = function () {
            $location.path('/payment');
        };

    }]);


