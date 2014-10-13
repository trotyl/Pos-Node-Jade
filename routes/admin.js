var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');
var Order = require('../models/order');

router.get('/', function(req, res) {
    res.render('admin', { title:'商品信息管理', view: 'index'});
});

router.get('/create', function (req, res) {
    res.render('admin/create', { title: '添加商品', view: 'create'});
});

router.get('/attribute', function (req, res) {
    res.render('admin/attribute', { title: '添加属性', view: 'attribute'});
});

router.get('/remove/', function (req, res) {
    res.render('admin/remove', { title: '添加属性', view: 'remove'});
});

module.exports = router;
