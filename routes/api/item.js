var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');

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

router.all('/amount', function (req, res) {
    var name = req.param('name');
    var amount = req.param('amount');
    Storage.getItem(name, function (err, result) {
        result.amount = parseInt(amount);
        result.save();
        res.send('');
    });
});

module.exports = router;
