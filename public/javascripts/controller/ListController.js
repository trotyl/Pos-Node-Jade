function ListController () {
    $('.list-item').on('click', 'button', function () {
        var itemName = $(this).closest('.list-item').find('.item-name').text();
        Cart.add(itemName);
    });
}