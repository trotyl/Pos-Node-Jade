$(document).ready(function () {
    $('#item-list-table').on('click', 'button', function () {
        var item_name = $(this);
        $.post(location.host + '/api/add_item', {name: item_name}, function (data, status) {
            if(!data || data.err) {
                // Warning
            }
        });
    });
});