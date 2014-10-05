$(document).ready(function () {
    var view = $('body').data('view');
    var doIt = {
        index: itemManageViewInitiate,
        create: addItemViewInitiate,
        attribute: addAttributeViewInitiate
    };
    doIt[view]();
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
            $.post('/api/item/delete', {name: item_name});
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
        $.post('/api/item/create', item);
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

    $('.attr-save').on('click', function () {
        saveAttrInfo();
        alert('添加属性成功！');
        location.assign('/create');
    })
}

function itemManageViewInitiate () {
    itemManageListenerInitiate();
}

function addItemViewInitiate () {
    var item = readItemInfo();
    if(item) {
        $('#input-name').val(item.name);
        $('#input-count').val(item.count);
        $('#input-price').val(item.price);
        $('#input-unit').val(item.unit);
    }
    checkAddItemForm();
    addItemListenerInitiate();
}

function addAttributeViewInitiate () {
    checkAddAttributeForm();
    addAttributeListenerInitiate();
}

function saveItemInfo () {
    var item = getItemInfo();
    localStorage.setItem('new_item', JSON.stringify(item));
}

function saveAttrInfo () {
    var attrs = getAttrInfo();
    localStorage.setItem('new_attrs', JSON.stringify(attrs));
}

function readItemInfo () {
    return JSON.parse(localStorage.getItem('new_item'));
}

function readAttrInfo () {
    return JSON.parse(localStorage.getItem('new_attrs'));
}

function removeItemInfo () {
    localStorage.removeItem('new_item');
    localStorage.removeItem('new_attrs');
}

function getItemInfo (item) {
    item = item || {};
    item.name = $('#input-name').val();
    item.count = $('#input-count').val();
    item.price = $('#input-price').val();
    item.unit = $('#input-unit').val();
    return item;
}

function getAttrInfo () {
    var attr = readAttrInfo() || {};
    attr.name = $('#attr-name').val();
    attr.val = $('#attr-val').val();
    return attr;
}

function getItemAttributes (item) {
    item = item || {};
    item.attrs = readAttrInfo() || {};
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
