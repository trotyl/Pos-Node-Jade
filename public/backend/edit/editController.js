posManager.controller('EditController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var isNew = ($location.path() == '/create');

        var initialize = function () {
            var tmp = JSON.parse(localStorage.getItem('tmp'));
            $scope.item = isNew? (tmp? new Item(tmp) :
                new Item({ id: 'ITEM0000', attrs: [] })):
                Item.get({ itemId: $routeParams.itemId });
        };
        initialize();

        $scope.saveIt = function () {
            $scope.item.$save();
            localStorage.removeItem('tmp');
            $scope.goBack();
        };

        $scope.addAttr = function () {
            isNew && localStorage.setItem('tmp', JSON.stringify($scope.item));
            $location.path(_.template('/add_attribute/<%= itemId %>', { itemId: $scope.item.id }));
        };

        $scope.removeAttr = function () {
            $location.path(_.template('/remove_attribute/<%= itemId %>', { itemId: $scope.item.id }));
        };

        $scope.goBack = function () {
            $location.path('/');
        };
    }]);


