var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    barcode: String,
    name: String,
    unit: String,
    price: Number,
    type: String,
    amount: Number,
    promotion: Boolean,
    attrs: [{
        time: Date,
        name: String,
        val: String
    }],
    birth: {
        type: Date,
        default: Date.now
    }
});

var Item = mongoose.model('item', itemSchema);

module.exports = Item;



