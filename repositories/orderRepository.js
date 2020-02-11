const models = require('../models');
const userRepository = require('./userRepository');
const { Op } = require("sequelize");

class OrderRepository {

    async getAllOrders() {
        const orders = await models.Order.findAll({
            include: [{
                model: models.Item,
                as: 'items'
            }]
        });
        return orders;
    }

    async getOrderById(id_) {
        return await models.Order.findOne({
            include: [{
                model: models.Item,
                as: 'items'
            }],
            where: {
                id: id_
            }
        });
    }

    async makeNewOrder(userEmail, order) {
        const user = await userRepository.getUserByEmail(userEmail);
        let items = await order.getOrder();
        let total = order.getTotal();
        const new_order = await models.Order.create({
            userId: user.id,
            total: total,
            date: new Date().toLocaleString()
        });
        for (let i = 0; i < items.length; i++) {
            let item = await models.OrdersItems.create({
                orderId: new_order.id,
                itemId: items[i].id,
                quantity: items[i].quantity,
                total: items[i].itemTotal
            });
            console.log(item);
        }
        return new_order;
    }

    async purgeOrders() {
        await models.Order.truncate({
            cascade: true
        });
        await models.OrdersItems.truncate({
            cascade: true
        });

    }
}

module.exports = new OrderRepository();