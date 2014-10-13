$(document).ready(function () {
    var view = $('body').data('view');
    var viewControllerMap = {
        index: HomeController,
        create: CreateController,
        add: NewAttributeController,
        remove: RemoveAttributeController
    };
    var controller = viewControllerMap[view];
    controller();
});

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

