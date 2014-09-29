$(document).ready(function () {
    function getCounter () {
        $.get('/api/cart_counter', function (data, status) {
            $('#cart_counter').text(data);
        });

    }
    getCounter();

    $('#item-list-table').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        var counter = $('#cart_counter');
        counter.text(parseInt(counter.text()) + 1);
        $.post('/api/add_item', {name: item_name});
    });

    $('#bought-list-table').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        var counter = $('#cart_counter');
        var number = $(this).closest('.btn-group').find('.item-count');
        if($(this).text() == '+') {
            counter.text(parseInt(counter.text()) + 1);
            number.text(parseInt(number.text()) + 1);
        }
        else if(parseInt(number.text()) > 0){
            counter.text(parseInt(counter.text()) - 1);
            number.text(parseInt(number.text()) - 1);
        }

        var self = this;
        $.post('/api/change_count', { name: item_name, count: number.text()}, function (data, status) {
            $(self).closest('tr').children().last().text(data);
        });
        if(parseInt(counter.text()) == 0) {
            location.assign('/list');
        }
    });

    $('#pay').on('click', function () {
        $.post('api/clear', function (data, status) {
            if(data) {
                location.assign('/list');
            }
        });
    });
});