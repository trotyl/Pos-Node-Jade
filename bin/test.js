var _ = require('lodash');
var Rule = require('../models/rule');
var Item = require('../models/item');

var rule = new Rule({ description: 'name==111&&unit>100' });
console.log(rule);
var filter = rule.render();
console.log(filter);
Item.render(filter, function (result) {
    console.log(result);
});
