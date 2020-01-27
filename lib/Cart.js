'use strict';

class Cart {
    static addToCart(product, cart, quantity = 1) {
        if (this.productInCart(product, cart)) {
            cart.items.forEach(item => {
                if (product.id === item[0].id) {
                    item[1] += quantity;
                }
            });
        } else {
            cart.items.push([product, quantity]);
        }
        cart.totals += quantity * product.price;
    }

    static removeFromCart(product, cart, quantity = 1) {
        if (this.productInCart(product, cart)) {
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i][0].id === product.id) {
                    cart.items[i][1] -= quantity;
                    cart.totals -= quantity * product.price;
                    if (item[1] < 1) {
                        cart.items.splice(i, 1);
                    }
                }
            }
        }
    }

    static emptyCart(request) {
        if (request.session) {
            request.session.cart.items = [];
            request.session.cart.totals = 0.00;
        }
    }
    static productInCart(product, cart) {
        let found = false;
        cart.items.forEach(item => {
            if (item[0].id === product.id) {
                found = true;
            }
        });
        return found;
    }
}

module.exports = Cart