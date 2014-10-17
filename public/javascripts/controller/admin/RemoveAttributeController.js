function RemoveAttributeController () {
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

