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
    Item.paginate(function (result) {
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
    Item.getById(itemId, function (result) {
        res.json(result);
    })
});

router.post('/:itemId', function (req, res) {
    var itemId = req.param('itemId');
    var item = req.body;
    var over = function (result) {
        res.send('');
    };
    if(itemId == 'ITEM0000') {
        Item.createNew(item, over);
    }
    else {
        Item.updateById(item, over);
    }
});

router.delete('/:itemId', function (req, res) {
    var itemId = req.param('itemId');
    Item.removeById(itemId, function (result) {
        res.send('');
    });
});

module.exports = router;
