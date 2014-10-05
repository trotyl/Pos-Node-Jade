$(document).ready(function () {
    itemManageViewInitiate();

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
        if($(this).attr('type') == 'number') {
            $(this).val(parseInt($(this).val()));
            if($(this).val() < 0) {
                $(this).val(0);
            }
        }
    });

    $('#item-save').on('click', function () {
        var item = getItemInfo();
        getItemAttributes(item);
        $.post('/api/create_item', item);
    });

    $('#attribute-add').on('click', function () {
        saveItemInfo();
        location.assign('attribute');
    })
});

function itemManageListenerInitiate () {
    function alterItemCount (count, operation) {
        count = (operation == 'add'? count + 1: count - 1);
        count = (count >= 0? count: 0);
        return count;
    }

    $('#item-manage-list').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        var number = $(this).closest('.btn-group').find('.item-count');
        var count = parseInt(number.val());
        count = alterItemCount(count, operation);
        number.text(count);
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
}

function itemManageViewInitiate () {
    itemManageListenerInitiate();
}

function saveItemInfo () {
    var item = getItemInfo();
    localStorage.setItem('new_item', item);
}

function getItemInfo (item) {
    item = item || {};
    item.name = $('#inputName').val();
    item.count = $('#inputCount').val();
    item.price = $('#inputPrice').val();
    item.unit = $('#inputUnit').val();
    return item;
}

function getItemAttributes (item) {
    item = item || {};
    item.attrs = localStorage.getItem('attrs') || '';
    return item;
}
