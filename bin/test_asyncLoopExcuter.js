var _ = require('lodash');
var Rule = require('../models/rule');
var Item = require('../models/item');

function asyncLoopExcuter (array, excuter, judge) {
  judge = judge || _judge;

  function _asyncLoopExcuter (excuter, index) {
    if(!judge(index)) {
      return array;
    }
    return excuter(index, array).then(function () {
      return _asyncLoopExcuter(excuter, index + 1, array);
    }, function (err) {
      console.log(err);
    });
  }

  function _judge (index) {
    return index < array.length;
  }

  return _asyncLoopExcuter(excuter, 0, array);
}

var excuter = function (index, array) {
  var instance = array[index];
  console.log(2, JSON.parse(instance.filter));
  return Item.findByRule(JSON.parse(instance.filter), function (items) {
    instance.items = items;
    console.log(3, array);
  });
};

Rule.find({}).exec()
  .then(function (rules) {
    console.log(1, rules);
    return asyncLoopExcuter(rules, excuter);
  })
  .then(function (res) {
    console.log(4, res);
  }, function (err) {
    console.log(err);
    callback(null);
  });


