const models = require('../models');
const { Op } = require("sequelize");

class CategoryRepository{
    async getAllCategories(){
        const categories = await models.Category.findAll({include: [{model: models.Category, as: 'Subcategories'}]});
        return categories;
    }

    async addCategory(name, parent=null){
        if(!parent){
            parent = await models.Category.findOne({
                where: {
                    name: 'root'
                }
            });
        }
        const category = await models.Category.create({
            name: name,
            parent: parent
        });
    }

    async getCategoryTree(name){

    }
}

module.exports = new CategoryRepository();