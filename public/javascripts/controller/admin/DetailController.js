function DetailController () {
    DetailListener();
}

function checkDetailForm () {
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
}

function DetailListener() {
    $('.form-control').on('change', function () {
        checkDetailForm();
    });

    $('#item-save').on('click', function () {
        var item = getItemInfo();
        $.post('/api/item/update', {
            name: item.name,
            amount: item.amount,
            price: item.price,
            unit: item.unit,
            attrs: JSON.stringify(item.attrs)
        });
    });
}