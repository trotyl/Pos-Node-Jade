function RemoveAttributeController () {
    var attrs = readAttrInfo();
    $('.attr').remove();
    _.chain(attrs)
        .sortBy(function (attr) {
            return -attr.time;
        })
        .each(function (val) {
            var attr = AttributeHelper(val.name, val.val);
            $('#attrs-list').append(attr);
        });
    RemoveAttributeListener();
}

function RemoveAttributeListener () {
    $('.attr-delete').on('click', function () {
        if(confirm('确定删除该属性？')) {
            var key = $(this).closest('tr').find('.attr-name').text();
            removeAttribute(key);
            RemoveAttributeController();
        }
    })
}

function AttributeHelper (name, val) {
    var attrLine = '<tr class="attr"><td class="attr-name"></td><td class="attr-val"></td><td class="attr-operation"></td></tr>';
    var removeAnchor = '<a class="attr-delete">删除</a>';
    var attrDom = $(attrLine);
    attrDom.find('.attr-name').text(name);
    attrDom.find('.attr-val').text(val);
    attrDom.find('.attr-operation').html(removeAnchor);
    return attrDom;
}
