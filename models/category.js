const category = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
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
        parentId:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    },{
        timestamps: false
    });

    Category.associate = function(models){
        Category.hasMany(Category, {as: 'Subcategories', foreignKey: 'parentId'});
    };
    return Category;
};

module.exports = category;