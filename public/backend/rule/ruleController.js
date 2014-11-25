posManager.controller('RuleController', ['$scope', '$location', '$route', '$routeParams', 'Rule',
    function($scope, $location, $route, $routeParams, Rule) {

        var initialize = function () {

        };
        initialize();

        $scope.saveIt = function () {
            var rule = new Rule($scope.rule);
            rule.$save($scope.goBack);
        };

        $scope.goBack = function () {
            $location.path('/promotion');
        };
    }]);





