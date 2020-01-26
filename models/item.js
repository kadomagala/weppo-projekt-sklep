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

    Item.findById = async identifier => {
        let item = await Item.findOne({
            where: {id: identifier}
        });
        return item;
    };
    return Item;
};

module.exports = item;