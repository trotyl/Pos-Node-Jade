var mongoose = require('mongoose');
var _ = require('lodash');

var itemSchema = mongoose.Schema({
    barcode: String,
    name: String,
    unit: String,
    price: Number,
    type: String,
    amount: Number,
    promotion: Boolean,
    attrs: Array,
    birth: Date
});

var Item = mongoose.model('item', itemSchema);

module.exports = Item;



