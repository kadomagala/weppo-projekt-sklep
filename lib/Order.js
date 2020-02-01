const itemRepository = require('../repositories/itemRepository');

class Order {
    constructor(cart) {
        this.myCart = cart;
        this.ordersItems = [];
        this.total = 0.0;
    }

    async getOrder() {
        let items = await itemRepository.getProductsByID(this.myCart.productsids());
        for (let i = 0; i < items.length; i++) {
            this.ordersItems[i] = items[i];

            this.ordersItems[i].quantity = this.myCart.items.find(item => {
                return item.id == this.ordersItems[i].id;
            }).quantity;
            this.ordersItems[i].itemTotal = ((Number(this.ordersItems[i].price) * 100) * Number(this.ordersItems[i].quantity)) / 100;
            this.total = Number(this.total) + Number(this.ordersItems[i].itemTotal);
        }
        return this.ordersItems;
    }
    getTotal() {
        return this.total;
    }
}

module.exports = { Order };