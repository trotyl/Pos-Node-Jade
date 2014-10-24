$(document).ready(function () {
    var view = $('body').data('view');
    var viewControllerMap = {
        index: HomeController,
        create: CreateController,
        add: NewAttributeController,
        remove: RemoveAttributeController,
        detail: DetailController
    };
    var controller = viewControllerMap[view];
    controller();
});

function saveItemInfo () {
    var item = getItemInfo();
    localStorage.setItem('new_item', JSON.stringify(item));
}

function readItemInfo () {
    return JSON.parse(localStorage.getItem('new_item')) || {};
}

function loadItemInfo () {
    var item = readItemInfo();
    $('.form-control').each(function (index, element) {
        if($(element).data('type') == 'fixed') {
            $(element).val(item[$(element).data('name')]);
        }
    });
    _(item.attrs).each(function (attr) {
        $('form').append(CreateFormHelper(attr));
    })
}

function removeItemInfo () {
    localStorage.removeItem('new_item');
}

function removeAttribute (key) {
    var item = readItemInfo();
    if(item.attrs) {
        _(item.attrs).remove(function (attr) {
            attr.name = key;
        });
        localStorage.setItem('new_item', JSON.stringify(item));
    }
    else {
        var name = $('#name').data('name');
        $.post('/api/item/remove', { name: name, key: key });
    }
}

function getItemInfo () {
    var item = readItemInfo();
    item.attrs = item.attrs || [];
    $('.form-control').each(function (index, element) {
        var type = $(element).data('type');
        if(type == 'fixed') {
            item[$(element).data('name')] = $(element).val();
        }
        else if(type == 'attr-edit') {
            _(item.attrs).find({ name: $(element).data('name')}).val = $(element).val();
        }
        else if(type == 'attr-new') {
            var name = $(element).val();
            var val = $('#attr-val').val();
            item.attrs = item.attrs || [];
            item.attrs.push({
                time: (new Date()).valueOf(),
                name: name,
                val: val
            });
        }
    });
    return item;
}
