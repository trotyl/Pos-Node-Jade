var mongodb = require('./db');
var mongoose = require('mongoose');
var _ = require('lodash');

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

itemSchema.statics.createNew = function (item, callback) {
    var nameGenerator = function (count) {
        var result = (count + 1).toString();
        while(result.length < 4) {
          result = '0' + result;
        }
        return 'ITEM' + result;
    };
    var self = this;
    this.count().exec()
        .then(function (count) {
            item.id = nameGenerator(count);
            self.create(item, function (err, item) {
                item.prepare();
                item.markModified('filter');
                item.save();
                callback(item.id);
            });
        }, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.updateById = function (item, callback) {
    this.update({ id: item.id }, item, { upsert: true }).exec()
        .then(function (result) {
            result.prepare();
            result.markModified('filter');
            result.save();
            callback(result.id);
        }, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.removeById = function (itemId, callback) {
    this.remove({ id: itemId }).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.bought = function (list, callback) {
    var amounts = {};
    var ids = _(list).map(function (item) {
        amounts[item.id] = item.amount;
        return item.id;
    }).value();

    var results;
    Item.find({ id: { $in: ids }}).exec()
        .then(function (result) {
            _(result).each(function (item) {
                if(item.amount < amounts[item.id]) {
                    results = results || [];
                    results.push(item);
                }
                else {
                    item.amount -= amounts[item.id];
                }
            });

            if(results) {
                callback(results);
            }
            else {
                _(result).each(function (item) {
                    item.save();
                });
                callback(null);
            }
        }, function (err) {
            console.log(err);
            callback(null);
        });
};

itemSchema.statics.findByRule = function (rule, callback) {
  return this.find({ $or: rule }).exec()
      .then(callback, function (err) {
          console.log(err);
          callback(null);
      });
};



var Item = mongoose.model('item', itemSchema);

module.exports = Item;



