$(document).ready(function () {
    $('#item-manage-list').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        var number = $(this).closest('.btn-group').find('.item-count');
        var count = parseInt(number.val());
        if (operation == 'add') {
            number.val(count + 1);
        }
        else if (count > 0) {
            number.val(count - 1);
        }
        else {
            return;
        }
        $.post('/api/alter_count', { name: item_name, count: count });
    });

    $('.item-count').on('change', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        var count = parseInt($(this).val());
        $.post('/api/alter_count', { name: item_name, count: count });
    });

    $('.item-delete').on('click', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        if(confirm('确定要删除商品 "' + item_name + '" 吗?')) {
            $(this).closest('tr').remove();
            $.post('/api/delete_item', {name: item_name});
        }
    });

    $('.form-control').on('change', function () {
        var complete = true;
        $('.form-control').each(function () {
            if(!$(this).val()) {
                complete = false;
            }
        });
        if(complete) {
            $('#item-add').removeClass('disabled');
        }
        else {
            $('#item-add').addClass('disabled');
        }
        if($(this).attr('type') == 'number' && $(this).val() < 0) {
            $(this).val(0);
        }
    });

    $('#item-add').on('click', function () {
        var name = $('#inputName').val();
        var count = $('#inputCount').val();
        var price = $('#inputPrice').val();
        var unit = $('#inputUnit').val();
        var attributes = JSON.parse(localStorage.getItem('attributes')) || {};
        $.post('/api/new_item', { name: name, count: count, price: price, unit: unit, attributes: attributes});
    })
});

