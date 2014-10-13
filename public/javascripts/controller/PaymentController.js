function PaymentController () {
    PaymentInitialize();
    PaymentListener();
}

function PaymentInitialize () {
    $('#view').load('api/payment', {cart: Cart.all()});
}

function PaymentListener () {
    $('#confirm').on('click', function () {
        $.post('api/payment/confirm', {cart: Cart.all()});
        Cart.clear();
        location.assign('list');
    })
}
