posManager.controller('PromotionController', ['$scope', '$location', '$route', '$routeParams', 'Rule',
    function($scope, $location, $route, $routeParams, Rule) {

        var initialize = function () {
            $scope.rules = Rule.query(function () {
                console.log($scope.rules);
            });

        };
        initialize();

        $scope.goToCreate = function () {
            $location.path('/new_rule');
        }
    }]);


