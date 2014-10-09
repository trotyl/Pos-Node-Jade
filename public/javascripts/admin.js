$(document).ready(function () {
    var view = $('body').data('view');
    var doIt = {
        index: itemManageController,
        create: addItemController,
        attribute: addAttributeController,
        remove: removeAttributeController
    };
    doIt[view]();
});

function itemManageListener () {
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

function addItemListener () {
    $('.form-control').on('change', function () {
        checkAddItemForm();
    });

    $('#item-save').on('click', function () {
        var item = getItemInfo();
        getItemAttributes(item);
        removeItemInfo();
        $.post('/api/item/create', item);
        location.assign('/admin')
    });

    $('#attribute-add').on('click', function () {
        saveItemInfo();
        location.assign('attribute');
    });

    $('#attribute-remove').on('click', function () {
        saveItemInfo();
        location.assign('remove');
    });
}

function addAttributeListener () {
    $('.form-control').on('change', function () {
        checkAddAttributeForm();
    });

    $('#attr-save').on('click', function () {
        saveAttrInfo();
        alert('保存成功！');
        location.assign('/admin/create');
    })
}

function removeAttributeListener () {
    $('.attr-delete').on('click', function () {
        if(confirm('确定删除该属性？')) {
            var key = $(this).closest('tr').find('.attr-name').text();
            removeAttribute(key);
            removeAttributeController();
        }
    })
}

function itemManageController () {
    itemManageListener();
}

function addItemController () {
    var item = readItemInfo();
    if(item) {
        $('#input-name').val(item.name);
        $('#input-count').val(item.count);
        $('#input-price').val(item.price);
        $('#input-unit').val(item.unit);
    }
    checkAddItemForm();
    addItemListener();
}

function addAttributeController () {
    checkAddAttributeForm();
    addAttributeListener();
}

function removeAttributeController () {
    var item = readItemInfo();
    var attrs = readAttrInfo();
    $('.attr').remove();
    _.chain(attrs)
        .sortBy(function (attr) {
            return -attr.time;
        })
        .each(function (val) {
            var attr = attrFormer(val.name, val.val);
            $('#attrs-list').append(attr);
        });
    removeAttributeListener();
}

function saveItemInfo () {
    var item = getItemInfo();
    localStorage.setItem('new_item', JSON.stringify(item));
}

function saveAttrInfo (attrs) {
    attrs = attrs || getAttrInfo();
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
    var name = $('#attr-name').val();
    attr[name] = {time: (new Date()).valueOf(), name: name, val: $('#attr-val').val()};
    return attr;
}

function getItemAttributes (item) {
    item = item || {};
    item.attrs = readAttrInfo() || {};
    return item;
}

function removeAttribute (key) {
    var attrs = readAttrInfo();
    delete attrs[key];
    saveAttrInfo(attrs);
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
        $('#attr-save').removeClass('disabled');
    }
    else {
        $('#attr-save').addClass('disabled');
    }
}

function attrFormer (name, val) {
    var attrLine = '<tr class="attr"><td class="attr-name"></td><td class="attr-val"></td><td class="attr-operation"></td></tr>';
    var removeAnchor = '<a class="attr-delete">删除</a>';
    var attrDom = $(attrLine);
    attrDom.find('.attr-name').text(name);
    attrDom.find('.attr-val').text(val);
    attrDom.find('.attr-operation').html(removeAnchor);
    return attrDom;
}
