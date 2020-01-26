const {Sequelize} = require ('sequelize');
const fs = require('fs');
let sequelize = null;

if (process.env.DATABASE_URL){
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        ssl: true,
        port: match[4],
        host: match[3],
        logging: true
    });
}else{
    try{
        let secret = JSON.parse(fs.readFileSync('secret.json'));
        sequelize = new Sequelize(secret.testdb.database, secret.testdb.user, secret.testdb.password, {
            host: secret.testdb.host,
            ssl: true,
            dialect: 'postgres'
        })
    }catch(err){
        console.log(err)
        console.log("Unable to connect to db");
    }
  
}

const model = {
    User: sequelize.import('./user'),
    Item: sequelize.import('./item')

};
//sequelize.sync({ force: true });

module.exports = model, {sequelize};
// INSERT INTO items (name,price,description,image) VALUES ('Super but', 2.32 ,'blasdasdas', 'https://i.picsum.photos/id/1000/300/300.jpg');