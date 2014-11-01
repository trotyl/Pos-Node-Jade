var express = require('express');
var router = express.Router();
var Storage = require('../../models/storage');
var Item = require('../../models/item');

router.get('/page', function (req, res) {
    var pageId = req.param('page');
    Item.page(pageId, function (result) {
        res.json(result);
    });
});

router.get('/count', function (req, res) {
    Storage.count(function (err, result) {
        var number = parseInt((result || 0) / 10) + 1;
        var count = [];
        for(var i = 0; i < number; i++){
            count[i] = i + 1;
        }
        res.json(count);
    })
});

router.get('/:itemId', function (req, res) {
    var itemId = req.param('itemId');
    Storage.get(itemId, function (err, result) {
        res.json(result);
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

module.exports = router;
