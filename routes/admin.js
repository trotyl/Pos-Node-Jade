var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');

router.get('/', function(req, res) {
    res.render('admin', { title:'商品信息管理', items: fixtures.loadAllItems()});
});

router.get('/new_item', function (req, res) {
    res.render('create_item', { title: '添加商品'});
});

module.exports = router;
