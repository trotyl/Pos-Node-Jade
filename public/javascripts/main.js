$(document).ready(function () {
    $('#item-list-table').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        $.post('/api/add_item', {name: item_name}, function (data, status) {
            if(!data || data.err) {
                alert('加入购物车失败！');
                console.log(data);
            }
            else {
                var counter = $('#cart_counter');
                counter.text(parseInt(counter.text()) + 1);
            }
        });
    });
});