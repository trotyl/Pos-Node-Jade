function CartController () {
    CartInitialize();
    CartListener();
}

function CartInitialize () {
    $('#view').load('api/cart', {cart: Cart.all()});
}

function CartListener () {
    $('.item-count').on('click', 'button', function () {
        var itemName = $(this).closest('.cart-item').find('.item-name').text();
        if($(this).data('operation') == 'add') {
            Cart.add(itemName);
        }
        else {
            Cart.minus(itemName);
        }
        $(this).closest('.btn-group').find('.number').text(Cart.amount(itemName));
        $(this).closest('tr').find('item-sum').load('api/cart/sum', {name: itemName});
        CartCheck();
    })
}

function CartCheck () {
    if($('#cart-count').text() == 0) {
        location.assign('list');
    }
}