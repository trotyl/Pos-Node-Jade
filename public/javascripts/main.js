$(document).ready(function () {
    var viewControllerMap = {
        home: HomeController,
        list: ListController,
        cart: CartController,
        payment: PaymentController
    };
    var view = $('#view').data('view');
    var controller = viewControllerMap[view];
    controller();
});