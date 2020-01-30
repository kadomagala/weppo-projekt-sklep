const ordersItems = (sequelize, DataTypes) => {
    const OrdersItems = sequelize.define('ordersItems', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    });
    OrdersItems.associate = function(models){
        OrdersItems.belongsTo(models.Order, {foreignKey: 'orderId', as: 'order'});
        OrdersItems.belongsTo(models.Item, {foreignKey: 'itemId', as: 'item'});
    };
    return OrdersItems;

};

module.exports = ordersItems;