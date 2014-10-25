posManager.controller('AddAttributeController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var itemId = $routeParams.itemId;
        $scope.isNew = (itemId == 'ITEM0000');

        var initialize = function () {
            $scope.attr = {};
            $scope.item = $scope.isNew? JSON.parse(localStorage.getItem('tmp')):
                Item.get({ itemId: $routeParams.itemId });
        };
        initialize();

        $scope.goHome = function () {
            $location.path('/');
        };

        $scope.goBack = function () {
            $location.path($scope.isNew? '/create': _.template('/detail/<%= itemId %>', { itemId: $scope.item.id }));
        };

        $scope.saveIt = function () {
            $scope.attr.birth = new Date();
            $scope.item.attrs.push($scope.attr);
            $scope.item.$save();
        };

    }]);





