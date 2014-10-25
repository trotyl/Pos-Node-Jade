posManager.controller('HomeController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var pageId = $routeParams.page;

        var initialize = function () {
            $scope.items = Item.query({ page: pageId });
            $scope.pages = Item.count();
        };
        initialize();

        $scope.currentPage = {
            isFirst: pageId == 1,
            isLast: pageId == $scope.pages.length
        };

        $scope.goToCreate = function () {
            $location.path('/create');
        };

        $scope.goToDetail = function (itemId) {
            $location.path(_.template('/detail/<%= itemId %>', { itemId: itemId }));
        };

        $scope.loadPage = function (thePageId, change) {
            var newPageId = thePageId || (pageId + change);
            $location.path(_.template('/list/<%= pageId %>', { pageId: newPageId }));
        };

        $scope.deleteIt = function (itemId) {
            var item = _($scope.items).find({ id: itemId });
            _($scope.items).remove({ id: itemId });
            item.$delete(initialize);
        };

        $scope.alterAmount = function (itemId, theAmount, change) {
            var item = _($scope.items).find({ id: itemId });
            item.amount = theAmount || (item.amount + change);
            item.$save();
        };
    }]);


