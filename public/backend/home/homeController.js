posManager.controller('HomeController', ['$scope', '$location', '$routeParams', 'Item',
    function($scope, $location, $routeParams, Item) {
        $scope.items = Item.query();
        var page = $routeParams.page;
        $scope.currentPage = {
            isFirst: page == 1,
            isLast: false
        };

    }]);


