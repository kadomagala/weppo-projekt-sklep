const models = require('../models');

class UserRepository{

    async createUser(email_, pwd_, role_){
        const user = await models.User.create({email: email_, password: pwd_, role: role_});
        console.log("created user with id:" + user.id);
    }

    async getUserByEmail(email_){
        const user = await models.User.findOne({where: {email: email_}});
        if(user === null){
            console.log("unable to find user with email: " + email_);
        }else{
            console.log("user found");
            return user;
        }
    }
    async updateUserPassword(email_, pwd_){
        await models.User.update({password : pwd_}, {
            where: {
                email: email_
            }
        });

    }
}

module.exports = new UserRepository();