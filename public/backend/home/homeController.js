posManager.controller('HomeController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {
        var pageId = $routeParams.page;
        $scope.items = Item.query({ page: pageId });
        $scope.pages = new Array(Item.count());
        $scope.currentPage = {
            isFirst: pageId == 1,
            isLast: false
        };

        $scope.goToCreate = function () {
            $location.path('/create');
        };

        $scope.goToDetail = function (itemId) {
            $location.path(_.template('/detail/<%= itemId %>', { itemId: itemId }));
        };

        $scope.loadPage = function (absolute, relative) {
            var newPageId = absolute || (pageId + relative);
            $scope.items = Item.query({ page: newPageId });
        };

        $scope.deleteIt = function (itemId) {
            Item.delete({ id: itemId });
            $route.reload();
        };

        $scope.alterAmount = function (itemId, change) {

        }
    }]);


