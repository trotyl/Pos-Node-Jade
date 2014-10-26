posManager.controller('PromotionController', ['$scope', '$location', '$route', '$routeParams', 'Item',
    function($scope, $location, $route, $routeParams, Item) {

        var initialize = function () {

        };
        initialize();

        $scope.goToCreate = function () {
            $location.path('/new_rule');
        }
    }]);


