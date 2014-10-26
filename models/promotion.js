var mongoose = require('mongoose');

var promotionSchema = mongoose.Schema({
    id: String,
    rule: String,
    from: Date,
    to: Date,
    bought: Number,
    gift: Number,
    birth: {
        type: Date,
        default: Date.now
    }
});

var Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;



