var mongoose = require('mongoose');

var ruleSchema = mongoose.Schema({
    id: String,
    description: String,
    from: Date,
    to: Date,
    bought: Number,
    gift: Number,
    birth: {
        type: Date,
        default: Date.now
    }
});

ruleSchema.methods.render = function () {
    var _peel = function (exp) {
        var left = 1, right = 0, i;
        for(i = 1; left != right; i++) {
            if(exp[i] === '(') { left++ }
            else if(exp[i] === ')') { right++ }
        }
        return exp.substr(1, i - 2);
    };

    var _cope = function (meta) {
        var operator = meta.match(/[<=>]/);
        var things = meta.split(operator);
        var result = {};
        var map = {
            '<': function () { result[things[0]] = { '$lt': things[1] }; },
            '=': function () { result[things[0]] = things[1]; },
            '>': function () { result[things[0]] = { '$gt': things[1] }; }
        };
        map[operator]();
        return [result];
    };

    var _delimit = function (exp) {
        var and = exp.indexOf('&&');
        var or = exp.indexOf('||');
        and = and >= 0? and: 0;
        or = or >= 0? or: 0;
        return Math.min(and, or);
    };

    var _choice = function (exp) {
        var result, position;
        if(exp[0] === '(') {
            var child = _peel(exp);
            position = _delimit(exp.substr(child.length));
            result = _render(child);
        }
        else {
            position = _delimit(exp);
            result =_cope(exp.substr(0, position));
        }
        return { result: result, position: position };
    };

    var _product = function (first, second) {
        var result = [];
        _(first).each(function (a) {
            _(second).each(function (b) {
                result.push(_.assign(a, b));
            });
        });
        return result;
    };

    var _render = function (expression) {
        var first = _choice(expression);
        if(first.position === 0) { return first.result; }
        var second = _choice(expression.substr(first.position + 2));
        return _product(first.result, second.result);
    };

    return _render(this.description.replace(/\s/g, ''));
};

var Rule = mongoose.model('rule', ruleSchema);

module.exports = Rule;



