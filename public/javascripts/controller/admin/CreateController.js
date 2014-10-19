function CreateController () {
    loadItemInfo();
    checkCreateForm();
    CreateListener();
}

function checkCreateForm () {
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

function CreateListener () {
    $('.form-control').on('change', function () {
        checkCreateForm();
    });

    $('#item-save').on('click', function () {
        var item = getItemInfo();
        removeItemInfo();
        $.post('/api/item/create', {
            name: item.name,
            amount: item.amount,
            price: item.price,
            unit: item.unit,
            attrs: JSON.stringify(item.attrs)
        });
        location.assign('/admin')
    });

    $('#attribute-add').on('click', function () {
        saveItemInfo();
        location.assign('/admin/attribute?from=create');
    });

    $('#attribute-remove').on('click', function () {
        saveItemInfo();
        location.assign('/admin/remove?from=create');
    });
}

function CreateFormHelper (attr) {
    var formHtml = '<div class="form-group">\
                        <label class="col-sm-2 control-label"></label>\
                        <div class="col-sm-2">\
                            <input class="form-control" type="text" data-type="attr-edit"/>\
                        </div>\
                    </div>';
    var formDom = $(formHtml);
    formDom.find('.control-label').text(attr.name);
    formDom.find('.form-control').data('name', attr.name);
    formDom.find('.form-control').val(attr.val);
    return formDom;
}