$(document).ready(function () {
    $('#item-manage-list').on('click', 'button', function () {
        var item_name = $(self).closest('tr').children().first().next().text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        var number = $(self).closest('.btn-group').find('.item-count');
        var count = parseInt(number.text());
        if (operation == 'add') {
            number.text(count + 1);
        }
        else if (parseInt(number.text()) > 0) {
            number.text(count - 1);
        }
        else {
            return;
        }
        $.post('/admin/alter_count', { name: item_name, count: count });
    });
});

