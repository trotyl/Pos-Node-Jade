posManager.controller('EditController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var isNew = ($location.path() == '/create');

        var initialize = function () {
            $scope.item = isNew? new Item({ id: 'ITEM0000', attrs: [] }): Item.get({ id: $routeParams.itemId });
        };
        initialize();

        $scope.saveIt = function () {
            $scope.item.$save();
        };

        $scope.addAttr = function () {
            $location.path(_.template('/add_attribute/<%= itemId %>', { itemId: $scope.item.id }));
        };

        $scope.removeAttr = function () {
            $location.path(_.template('/remove_attribute/<%= itemId %>', { itemId: $scope.item.id }));
        };

        $scope.cancel = function () {
            $location.path(isNew? '/create': _.template('/edit/<%= itemId %>', { itemId: $scope.item.id }));
        };
    }]);


