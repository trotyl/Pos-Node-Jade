function NewAttributeController () {
    CheckAttributeForm();
    NewAttributeListener();
}

function CheckAttributeForm () {
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

function NewAttributeListener () {
    $('.form-control').on('change', function () {
        CheckAttributeForm();
    });

    $('#attr-save').on('click', function () {
        var from = $('#from').data('from');
        if(from == 'add') {
            saveItemInfo();
            alert('保存成功！');
            location.assign('/admin/create');
        }
        else {
            var name = $('#name').data('name');
            var attr_name = $('#attr-name').val();
            var attr_val = $('#attr-val').val();
            $.post('/api/item/attribute', { name: name, attr_name: attr_name, attr_val: attr_val }, function (err, result) {
                alert('保存成功！');
                location.assign('/admin/detail/' + name);
            });
        }

    })
}