const user = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            defaultValue: "user"
        }
    },{
        timestamps: false
    });

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: {email: login},
        });
        return user;
    }

    return User;
};

module.exports = user;