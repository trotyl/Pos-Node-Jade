var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');

router.get('/page', function (req, res) {
//    var pageId = req.param('page');
//    Storage.page(pageId, function (err, result) {
//        res.json(result);
//    });
    var items = [{
        id: 'ITEM0001',
        name: '可乐',
        unit: '瓶',
        price: 3,
        type: '饮料',
        amount: 99,
        attrs: [],
        birth: new Date
    },{
        id: 'ITEM0002',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        type: '饮料',
        amount: 100,
        attrs: [],
        birth: new Date
    }];
    res.json(items);
});

router.get('/count', function (req, res) {
    Storage.count(function (err, result) {
        var number = (result || 0) / 10 + 1;
        var count = [];
        for(var i = 0; i < number; i++){
            count[i] = i;
        }
        res.json(count);
    })
});

router.post('/:itemId', function (req, res) {
    var itemId = req.param('itemId');
    var item = req.body;
    Storage.update(item, function (err, result) {
        res.send('');
    })
});

router.delete('/:itemId', function (req, res) {
    var itemId = req.param('itemId');
    Storage.remove(itemId, function (err, result) {
        res.send('');
    })
});

// Old Interface

router.all('/', function (req, res) {
    Storage.allItems(1, function (err, result) {
        res.render('admin/list', { items: result || [] });
    });
});

router.all('/page/:id', function (req, res) {
    var page = req.param('id');
    Storage.allItems(page, function (err, result) {
        Storage.itemCount(function (err, count) {
            var total = Math.ceil(count / 10);
            res.render('admin/list', { items: result || [], now: page, total: total});
        })
    });
});

router.all('/delete', function (req, res) {
    var name = req.body.name;
    Storage.removeItem(name, function () {
        res.send('');
    });
});

router.all('/create', function (req, res) {
    var params = {
        name: req.param('name'),
        amount: req.param('amount'),
        price: req.param('price'),
        unit: req.param('unit'),
        attrs: JSON.parse(req.param('attrs'))
    };
    Storage.addItem(params, function () {
        res.send('');
    });
});

router.all('/update', function (req, res) {
    var params = {
        name: req.param('name'),
        amount: req.param('amount'),
        price: req.param('price'),
        unit: req.param('unit'),
        attrs: JSON.parse(req.param('attrs'))
    };
    Storage.updateItem(params, function () {
        res.send('');
    });
});

router.all('/remove', function (req, res) {
    var name = req.param('name');
    var attr = req.param('key');
    Storage.removeAttribute(name, attr, function (err, result) {
        res.send('');
    })
});

router.all('/amount', function (req, res) {
    var name = req.param('name');
    var amount = req.param('amount');
    Storage.getItem(name, function (err, result) {
        result.amount = parseInt(amount);
        result.save();
        res.send('');
    });
});

router.all('/attribute', function (req, res) {
    var name = req.param('name');
    var attr_name = req.param('attr_name');
    var attr_val = req.param('attr_val');
    Storage.addAttribute(name, attr_name, attr_val, function (err, result) {
        res.send('');
    })
});

module.exports = router;
