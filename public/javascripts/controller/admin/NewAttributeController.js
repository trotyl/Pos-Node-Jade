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
        saveAttrInfo();
        alert('保存成功！');
        location.assign('/admin/create');
    })
}