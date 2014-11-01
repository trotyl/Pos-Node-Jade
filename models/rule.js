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
    // 去掉从右至左最后一个括号
    var _peel = function (exp) {
        var left = 0, right = 1, i;
        for(i = exp.length - 2; (left != right) && (i >= 0); i--) {
            if(exp[i] === '(') { left++ }
            else if(exp[i] === ')') { right++ }
        }
        return exp.substring(i + 2, exp.length - 1);
    };

    // 找到上一个逻辑运算符的位置
    var _delimit = function (exp) {
        return Math.max(exp.lastIndexOf('&&'), exp.lastIndexOf('||'));
    };

    // 找到最末端的表达式
    var _tail = function (exp) {
        var position = _delimit(exp);
        return position > 0? exp.substr(position + 2): exp;
    };

    // 将原子表达式转换为 mongodb 查询所需的对象数组
    var _cope = function (meta) {
        var operator = meta.match(/[<>]|(==)/)[0];
        var things = meta.split(operator);
        var result = {};
        var map = {
            '<': function () { result[things[0]] = { '$lt': things[1] }; },
            '==': function () { result[things[0]] = things[1]; },
            '>': function () { result[things[0]] = { '$gt': things[1] }; }
        };
        map[operator]();
        return [result];
    };

    // 确定一个表达式是 组合表达式 或 原子表达式 并继续处理
    var _choice = function (exp, closed) {
        var result;
        var position = _delimit(exp);
        var length = closed? exp.length + 2: exp.length;
        if(position >= 0){
            result = _render(exp);
        }
        else {
            result = _cope(exp);
        }
        return { result: result, length: length };
    };

    // 计算两个表达式的笛卡尔积
    var _and = function (first, second) {
        var result = [];
        _(first).each(function (a) {
            _(second).each(function (b) {
                var c = _.cloneDeep(a);
                result.push(_.assign(c, b));
            });
        });
        return result;
    };

    // 计算两个表达式的并
    var _or = function (first, second) {
        return _.union(first, second);
    };

    // 判断一个表达式当前处是否有括号
    var closed = function (exp) {
        return exp[exp.length - 1] == ')';
    };

    // 将任何非原子表达式渲染成 前表达式 逻辑运算符 后表达式
    var _render = function (exp) {
        var last = closed(exp)? _choice(_peel(exp), true): _choice(_tail(exp), false);
        if(exp.length <= last.length) {
            return last.result;
        }
        var remain = exp.substr(0, exp.length - last.length - 2);
        var second = _choice(remain, false);
        var operation = {
            '&': _and,
            '|': _or
        }[exp[exp.length - last.length - 2]];
        return operation(last.result, second.result);
    };

    return _render(this.description.replace(/\s/g, ''));
};

ruleSchema.statics.createNew = function (rule, callback) {
    this.create(rule, function (err, result) {
        callback(result);
    });
};

ruleSchema.statics.all = function (callback) {
    this.find({}).exec()
        .then(callback, function (err) {
            console.log(err);
            callback(null);
        });
};

var Rule = mongoose.model('rule', ruleSchema);

module.exports = Rule;



