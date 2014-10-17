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
}

function removeItemInfo () {
    localStorage.removeItem('new_item');
}

function getItemInfo () {
    var item = readItemInfo();
    item.attrs = item.attrs || {};
    $('.form-control').each(function (index, element) {
        var type = $(element).data('type');
        if(type == 'fixed') {
            item[$(element).data('name')] = $(element).val();
        }
        else if(type == 'attr-edit') {
            item.attrs[$(element).data('name')] = $(element).val();
        }
        else if(type == 'attr-new') {
            var name = $(element).val();
            var val = $('#attr-val').val();
            item.attrs = item.attrs || {};
            item.attrs[name] = {
                time: (new Date()).valueOf(),
                name: name,
                val: val
            };
        }
    });
    return item;
}
