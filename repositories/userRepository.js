const models = require('../models');

class UserRepository {

    async getAllUsers() {
        const users = await models.User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return users;
    }

    async createUser(email_, pwd_, role_) {
        const user = await models.User.create({ 
            email: email_, 
            password: pwd_, 
            role: role_ 
        });
    }

    async getUserByEmail(email_) {
        const user = await models.User.findOne({ 
            where: { 
                email: email_ 
            }
        });
        return user;
    }
    async updateUserPassword(email_, pwd_) {
        await models.User.update({ password: pwd_ }, {
            where: {
                email: email_
            }
        });

    }
    async findByLogin(email_) {
        let user = await models.User.findOne({
            where: { 
                email: email_ 
            }
        });
        return user;
    }
    async deleteUserById(id_) {
        let user = await models.User.destroy({
            where: { 
                id: id_ 
            }
        });
        return user;
    }
}

module.exports = new UserRepository();