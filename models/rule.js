var mongoose = require('mongoose');

var ruleSchema = mongoose.Schema({
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

var Rule = mongoose.model('rule', ruleSchema);

module.exports = Rule;



