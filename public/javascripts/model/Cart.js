
function Cart () {
}

Cart.all = function () {
    return JSON.parse(localStorage.getItem('cartItems')) || {};
};

Cart.save = function (cart) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
};

Cart.clear = function () {
    localStorage.removeItem('cartItems');
};

Cart.add = function (name) {
    var cart = Cart.all();
    if(!cart[name]) {
        cart[name] = 0;
    }
    cart[name] += 1;
    Cart.save(cart);
};

Cart.minus = function (name) {
    var cart = Cart.all();
    cart[name] -= 1;
    if(cart[name] < 0) {
        cart[name] = 0;
    }
    Cart.save(cart);
};

Cart.amount = function (name) {
    var cart = Cart.all();
    return cart[name] || 0;
};

