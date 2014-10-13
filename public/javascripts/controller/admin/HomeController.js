function HomeController () {
    $('#content').load('api/item', function () {
        HomeListener();
    });
}

function HomeListener () {
    function alterItemCount (count, operation) {
        count = (operation == 'add'? count + 1: count - 1);
        count = (count >= 0? count: 0);
        return count;
    }

    $('#item-manage-list').on('click', 'button', function () {
        var item_name = $(this).closest('tr').find('.item-name').text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        var number = $(this).closest('td').find('.number');
        var amount = parseInt(number.val());
        amount = alterItemCount(amount, operation);
        number.val(amount);
        $.post('/api/item/amount', { name: item_name, amount: amount });
    });

    $('.item-count').on('change', function () {
        var item_name = $(this).closest('tr').find('.item-name');
        var count = parseInt($(this).val());
        $.post('/api/alter_count', { name: item_name, count: count });
    });

    $('.item-delete').on('click', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        if(confirm('确定要删除商品 "' + item_name + '" 吗?')) {
            $.post('/api/item/delete', {name: item_name}, function () {
                location.reload();
            });
        }
    });
}