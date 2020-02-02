const order = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        },
        total: {
            type: DataTypes.DECIMAL
        },
        date: {
            type: DataTypes.DATE
        }
    },{
        timestamps: false
    });
    Order.associate = function(models){
        Order.belongsTo(models.User, {foreignKey: 'userId', as: 'customer'});
        Order.belongsToMany(models.Item, {through: models.OrdersItems, foreignKey: 'orderId', as: 'items'});
    }
    return Order;

};

module.exports = order;