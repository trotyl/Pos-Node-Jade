var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');

router.get('/', function(req, res) {
    res.render('admin', { title:'商品信息管理', view: 'index', items: fixtures.loadAllItems()});
});

router.get('/create', function (req, res) {
    res.render('admin/create', { title: '添加商品', view: 'create'});
});

router.get('/attribute', function (req, res) {
    res.render('admin/attribute', { title: '添加属性', view: 'attribute'});
});

module.exports = router;
