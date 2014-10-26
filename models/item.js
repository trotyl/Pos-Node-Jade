var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    id: String,
    name: String,
    unit: String,
    price: Number,
    type: String,
    amount: Number,
    promotion: Boolean,
    attrs: [{
        birth: Date,
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



