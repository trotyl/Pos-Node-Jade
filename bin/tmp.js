var _head = function (exp) {
  var result = exp.substr(0, _delimit(exp));
  console.log(0, result);
  return result;
};

var _delimit = function (exp) {
  if(exp.indexOf('&&') >= 0 || exp.indexOf('||') >= 0) {
    var position = exp.match(/(&&)|(\|\|)]/).index;
    return position;
  }
  return -1;
};

console.log(_head('name==hehe&&time>0'));
console.log(1);
