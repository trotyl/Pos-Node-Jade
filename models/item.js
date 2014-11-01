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

//实例方法
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

//静态方法
itemSchema.statics.all = function (callback) {
    this.find({ amount: { $gt: 0 }}).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.page = function (page, callback) {
    this.find().sort({ birth: 'desc' }).skip(10 * (page - 1)).limit(10).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.paginate = function (callback) {
    this.count({ amount: { $gt: 0 }}).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.getById = function (itemId, callback) {
    this.findOne({ id: itemId }).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};



var Item = mongoose.model('item', itemSchema);

module.exports = Item;



