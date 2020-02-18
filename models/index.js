const { Sequelize } = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = true;
const fs = require('fs');
const config = require('../config');

let sequelize = null;

if (config.isProduction) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        ssl: true,
        logging: false
    });
} else {
    try {
        let secret = JSON.parse(fs.readFileSync('secret.json'));
        sequelize = new Sequelize(secret.testdb.database, secret.testdb.user, secret.testdb.password, {
            host: secret.testdb.host,
            ssl: true,
            protocol: 'postgres',
            dialect: 'postgres',
            logging: true
        })
    } catch (err) {
        console.log("Unable to connect to db");
        console.log(err)
    }

}

const model = {
    User: sequelize.import('./user'),
    Category: sequelize.import('./category'),
    Item: sequelize.import('./item'),
    OrdersItems: sequelize.import('./ordersItems'),
    Order: sequelize.import('./order')

};

model.Category.associate(model);
model.Item.associate(model);
model.Order.associate(model);
model.OrdersItems.associate(model);


//sequelize.sync();
//sequelize.sync({  alter: true });
sequelize.sync({force: true});

module.exports = model, {
    sequelize
};