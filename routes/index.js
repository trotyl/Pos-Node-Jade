var express = require('express');
var router = express.Router();
var fixtures = require('../models/fixtures');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '首页' , active: {home: true}});
});

router.get('/list', function(req, res) {
    res.render('list', { title: '商品列表' , active: {list: true}, list: fixtures.loadAllItems()});
});

module.exports = router;
