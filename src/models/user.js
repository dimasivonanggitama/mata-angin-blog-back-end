module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        phone: {
            allowNull: false,
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        isVerified: {
            type: Sequelize.BOOLEAN
        },
    }, {
        updatedAt: false,
        timestamps: false,
    });

    User.associate = models => {
        User.hasMany(models.Blog, {foreignKey: "user_id"});
    }

    return User;
}