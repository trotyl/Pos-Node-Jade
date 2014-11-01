var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    id: String,
    name: String,
    unit: String,
    price: Number,
    amount: Number,
    attrs: [{
        birth: Date,
        name: String,
        val: String
    }],
    birth: {
        type: Date,
        default: Date.now
    },
    filter: {}
});

itemSchema.methods.prepare = function () {
    this.filter = {
        id: this.id,
        name: this.name,
        unit: this.unit,
        price: this.price,
        type: this.type,
        amount: this.amount
    };
    _(this.attrs).each(function (attr) {
        this.filter[attr.name] = attr.val;
    }, this);
};

var Item = mongoose.model('item', itemSchema);

module.exports = Item;



