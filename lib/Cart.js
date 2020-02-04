class Item {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

class Cart {

    constructor(Cart) {
        if (Cart) this.items = Cart.items;
        else this.items = [];
    }

    addToCart(Item) {

        if (this.isProductInCart(Item)) {
            this.items.forEach(item => {
                if (item.id === Item.id) {
                    item.quantity += Item.quantity;
                }
            });
        } else {
            this.items.push(Item);
        }
    }

    removeFromCart(Item) {
        if (this.isProductInCart(Item)) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id == Item.id) {
                    if (this.items[i].quantity == 1) {
                        this.items.splice(i, 1);
                    } else {
                        this.items[i].quantity -= 1;
                    }

                }
            }
        }
    }

    emptyCart() {
        this.items = [];
    }

    isProductInCart(Item) {
        let found = false;
        this.items.forEach(c_item => {
            if (c_item.id === Item.id) {
                found = true;
            }
        });
        return found;
    }
    productsids() {
        var array = [];
        this.items.forEach(item => {
            array.push(item.id)
        });
        return array;
    }
}
module.exports = { Cart, Item };
