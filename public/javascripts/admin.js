$(document).ready(function () {
    itemManageViewInitiate();
    addItemViewInitiate();
    addAttributeViewInitiate();
});

function itemManageListenerInitiate () {
    function alterItemCount (count, operation) {
        count = (operation == 'add'? count + 1: count - 1);
        count = (count >= 0? count: 0);
        return count;
    }

    $('#item-manage-list').on('click', 'button', function () {
        var item_name = $(this).closest('tr').find('.item-name').text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        var number = $(this).closest('td').find('.number');
        var count = parseInt(number.val());
        count = alterItemCount(count, operation);
        number.val(count);
        $.post('/api/alter_count', { name: item_name, count: count }, function () {});
    });

    $('.item-count').on('change', function () {
        var item_name = $(this).closest('tr').find('.item-name');
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

function addItemListenerInitiate () {
    $('.form-control').on('change', function () {
        checkAddItemForm();
    });

    $('#item-save').on('click', function () {
        var item = getItemInfo();
        getItemAttributes(item);
        removeItemInfo();
        $.post('/api/create_item', item);
    });

    $('#attribute-add').on('click', function () {
        saveItemInfo();
        location.assign('attribute');
    })
}

function addAttributeListenerInitiate () {
    $('.form-control').on('change', function () {
        checkAddAttributeForm();
    });
}

function itemManageViewInitiate () {
    itemManageListenerInitiate();
}

function addItemViewInitiate () {
    var item = readItemInfo();
    if(item) {
        $('#inputName').val(item.name);
        $('#inputCount').val(item.count);
        $('#inputPrice').val(item.price);
        $('#inputUnit').val(item.unit);
    }
    checkAddItemForm();
    addItemListenerInitiate();
}

function addAttributeViewInitiate () {
    addAttributeListenerInitiate();
}

function saveItemInfo () {
    var item = getItemInfo();
    localStorage.setItem('new_item', JSON.stringify(item));
}

function readItemInfo () {
    return JSON.parse(localStorage.getItem('new_item'));
}

function removeItemInfo () {
    localStorage.removeItem('new_item');
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

function checkAddItemForm () {
    var complete = true;
    $('.form-control').each(function () {
        if(!$(this).val()) {
            complete = false;
        }
    });
    if(complete) {
        $('#item-save').removeClass('disabled');
    }
    else {
        $('#item-save').addClass('disabled');
    }
    if($(this).attr('type') == 'number') {
        $(this).val(parseInt($(this).val()));
        if($(this).val() < 0) {
            $(this).val(0);
        }
    }
}

function checkAddAttributeForm () {
    var complete = true;
    $('.form-control').each(function () {
        if(!$(this).val()) {
            complete = false;
        }
    });
    if(complete) {
        $('#item-save').removeClass('disabled');
    }
    else {
        $('#item-save').addClass('disabled');
    }
}
