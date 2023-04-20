const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Category extends Model {}

Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "category",
  }
);
//added the association with the post model
Category.associate = (models) => {
  Category.hasMany(models.Post, {
    foreignKey: "category_id",
  });
};

module.exports = Category;
