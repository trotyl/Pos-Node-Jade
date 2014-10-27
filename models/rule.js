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
    // 找到最左边括号对应的右括号并去掉这两个括号
    var _peel = function (exp) {
        var left = 1, right = 0, i;
        for(i = 1; left != right; i++) {
            if(exp[i] === '(') { left++ }
            else if(exp[i] === ')') { right++ }
        }
        return exp.substr(1, i - 2);
    };

    // 将原子表达式转换为 mongodb 查询所需的对象数组
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

    // 找到下一个逻辑运算符的位置
    var _delimit = function (exp) {
        var and = exp.indexOf('&&');
        var or = exp.indexOf('||');
        and = and >= 0? and: 0;
        or = or >= 0? or: 0;
        return Math.min(and, or);
    };

    // 确定一个表达式是 组合表达式 或 原子表达式 并继续处理
    var _choice = function (exp) {
        var result, position;
        if(exp[0] === '(') {
            var child = _peel(exp);
            position = _delimit(exp.substr(child.length));
            result = _render(child);
        }
        else if(exp.indexOf(/[(&&)(||)]/) >= 0){
            position = _delimit(exp);
            result = _render(exp);
        }
        else {
            position = 0;
            result = _cope(exp);
        }
        return { result: result, position: position };
    };

    // 计算两个表达式的迪卡尔积
    var _product = function (first, second) {
        var result = [];
        _(first).each(function (a) {
            _(second).each(function (b) {
                result.push(_.assign(a, b));
            });
        });
        return result;
    };

    // 将任何非原子表达式渲染成 前表达式 逻辑运算符 后表达式
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



