posManager.controller('EditController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var isNew = ($location.path() == '/create');
        var itemId = isNew? 'ITEM0000': $routeParams.itemId;
        var initialize = function () {
            $scope.item = _(Item.query()).find({ id: itemId }) || { attrs: [] };
        };
        initialize();

        $scope.saveIt = function () {
            $scope.item.$save();
        };

        $scope.addAttr = function () {
            $location.path(_.template('/add_attribute/<%= itemId %>', { itemId: itemId }));
        };

        $scope.removeAttr = function () {
            $location.path(_.template('/remove_attribute/<%= itemId %>', { itemId: itemId }));
        };

        $scope.cancel = function () {
            $location.path(isNew? '/create': _.template('/edit/<%= itemId %>', { itemId: itemId }));
        };
    }]);


