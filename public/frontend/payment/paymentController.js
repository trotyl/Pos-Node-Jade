posApp.controller('PaymentController', ['$scope', '$location', '$route', '$routeParams', 'Cart',
    function($scope, $location, $route, $routeParams, Cart) {
        var initialize = function () {
            $scope.items = Cart.get();
            $scope.gifts = _($scope.items).where({ promotion: true }).value() || [];
            $scope.total = _($scope.items).reduce(function (sum, item) {
                return item.price * item.amount + sum;
            }, 0);
            $scope.saving = _($scope.gifts).reduce(function (sum, item) {
                return 0;
            }, 0);
        };
        initialize();

        $scope.pay = function () {
            Cart.pay(function (err, result) {
                if(result.message) {
                    var message = _(result.message).reduce(function (sum, item) {
                        return sum + item.name + '剩余' + item.amount + item.unit + '；';
                    }, '');
                    message += '商品余额不足，交易失败。';
                    //console.log(message);
                    alert(message);
                }
                else {
                    Cart.clear();
                    $scope.goHome();
                }
            });
        }
    }]);


