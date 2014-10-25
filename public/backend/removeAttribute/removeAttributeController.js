posManager.controller('RemoveAttributeController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var itemId = $routeParams.itemId;
        $scope.isNew = (itemId === 'ITEM0000');

        var initialize = function () {
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

        $scope.removeAttr = function (attrName) {
            $scope.attr.birth = new Date();
            $scope.item.attrs.push($scope.attr);
            if($scope.isNew) {
                localStorage.setItem('tmp', JSON.stringify($scope.item));
            }
            else {
                $scope.item.$save();
            }
            $scope.goBack();
        };

    }]);





