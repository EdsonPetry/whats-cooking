const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const User = require('./user')

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "post",
  }
);
//added the association with the category model
Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: "user_id",
  });
  Post.belongsTo(models.Category, {
    foreignKey: "category_id",
  });
};

Post.belongsTo(User)

module.exports = Post;
