const models = require('../models');
const { Op } = require("sequelize");

class ItemRepository {

    async getAllProducts() {
        const items = await models.Item.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return items;
    }

    async getProductByID(id_) {
        const item = await models.Item.findOne({
            where: {
                id: id_
            }
        });
        return item;
    }
    async getProductsByID(id_) {
        const item = await models.Item.findAll({
            where: {
                id: id_
            },
            order: [
                ['id', 'ASC']
            ]
        });
        return item;
    }

    async getProductPrice(id_) {
        const item = await models.Item.findOne({
            where: {
                id: id_
            }
        });
        return item.price;
    }

    async insertProduct(name_, price_, description_, image_) {
        const item = await models.Item.create({
            name: name_,
            price: price_,
            description: description_,
            image: image_
        });
    }

    async updateProduct(id_, name_, price_, description_, image_) {
        await models.Item.update({
            name: name_,
            price: price_,
            description: description_,
            image: image_
        }, {
            where: {
                id: id_
            }
        });
    }

    async deleteProductByID(id_) {
        await models.Item.destroy({ where: { id: id_ } });
    }

    async searchProducts(searchQuery) {
        let pattern = "%" + searchQuery + "%";
        const items = await models.Item.findAll({
            where: {
                [Op.or]: [{
                        name: {
                            [Op.iLike]: pattern
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: pattern
                        }
                    }
                ]
            }
        });

        return items;
    }

    async getProductsFromRange(_from, _to) {
        const item = await models.Item.findAll({
            where: {
                id: {
                    [Op.between]: [_from, _to]
                }
            },
            order: [
                ['id', 'ASC']
            ]
        });
        return item;
    }
}

module.exports = new ItemRepository();