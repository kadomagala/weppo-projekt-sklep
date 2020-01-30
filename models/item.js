const item = (sequelize, DataTypes) => {
    const Item = sequelize.define('items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT
        },
        image:{
            type: DataTypes.TEXT
        }
        
    },{
        timestamps: false
    });

    Item.associate = function(models){
        Item.belongsToMany(models.Order, {through: 'OrdersItems', foreignKey: 'itemId' , as: 'orders'});
    };
    return Item;
};

module.exports = item;