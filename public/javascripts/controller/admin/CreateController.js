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
        location.assign('attribute');
    });

    $('#attribute-remove').on('click', function () {
        saveItemInfo();
        location.assign('/admin/remove?from=create');
    });
}
