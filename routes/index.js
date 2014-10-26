var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Storage = require('../models/storage');
var moment = require('moment');

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: 'Pos Web' });
});

router.get('/admin', function(req, res) {
    res.render('admin', { title: '商品信息管理' });
});

module.exports = router;
