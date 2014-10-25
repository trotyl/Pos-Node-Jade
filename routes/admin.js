var express = require('express');
var router = express.Router();
var Storage = require('../models/storage');

router.get('/', function(req, res) {
    res.render('admin', { title:'商品信息管理' });
});

module.exports = router;
