module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("Blog", {
        blog_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          image: {
            allowNull: false,
            type: Sequelize.STRING
          },
          category_id: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          content: {
            type: Sequelize.STRING
          },
          video: {
            type: Sequelize.STRING
          },
          keyword_id: {
            allowNull: false,
            type: Sequelize.INTEGER
          },
          country_id: {
            allowNull: false,
            type: Sequelize.INTEGER
          }
    }, {
        timestamps: false,
    });
    return Blog;
}