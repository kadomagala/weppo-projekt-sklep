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
                //console.log(i + ' item number ' + this.items[i]);
                if (this.items[i].id == Item.id) {
                    //console.log(i + ' item to del number' + i);
                    delete this.items[i];
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
}
module.exports = {Cart, Item};




/*




var c1 = new Cart(null);
var i1 = new Item(1, 1);
var i2 = new Item(2, 1);
console.log('i1 w koszyku? -' + c1.isProductInCart(i1));
console.log('i2 w koszyku? -' + c1.isProductInCart(i2));
var i3 = new Item(3, 3);
c1.addToCart(i1);
c1.addToCart(i2);
c1.addToCart(i3);
console.log('i1 w koszyku? +' + c1.isProductInCart(i1));
console.log('i2 w koszyku? +' + c1.isProductInCart(i2));
console.log('i3 w koszyku? +' + c1.isProductInCart(i3));
c1.removeFromCart(i3);
console.log('i3 w koszyku? -' + c1.isProductInCart(i3));
c1.addToCart(i3);
console.log('i3 w koszyku? +' + c1.isProductInCart(i3));
c1.emptyCart();
console.log('i1 w koszyku? -' + c1.isProductInCart(i1));
console.log('i2 w koszyku? -' + c1.isProductInCart(i2));
console.log('i3 w koszyku? -' + c1.isProductInCart(i3));
c1.addToCart(i1);
c1.addToCart(i1);
c1.addToCart(i3);
c1.addToCart(i3);
console.log(c1);
console.log("----------");
c2 = new Cart(c1);
console.log(c2);
*/


//module.exports = Cart
//module.exports = Item