var express = require('express');
var router = express.Router();
var Storage = require('../models/storage');

router.get('/', function(req, res) {
    res.render('admin', { title:'商品信息管理', view: 'index', page: 1});
});

router.get('/page/:id', function(req, res) {
    var page = req.param('id');
    res.render('admin', { title:'商品信息管理', view: 'index', page: page});
});

router.get('/detail/:name', function (req, res) {
    var name = req.param('name');
    Storage.getItem(name, function (err, result) {
        res.render('admin/detail', { title: '商品详情', view: 'detail', item: result});
    });
});

router.get('/create', function (req, res) {
    res.render('admin/create', { title: '添加商品', view: 'create'});
});

router.get('/attribute', function (req, res) {
    res.render('admin/attribute', { title: '添加属性', view: 'add'});
});

router.get('/remove/:name', function (req, res) {
    var name = req.param('name');
    var from = req.param('from');
    Storage.getItem(name, function (err, result) {
        res.render('admin/remove', { title: '添加属性', view: 'remove', item: result, from: from});
    });
});

module.exports = router;
