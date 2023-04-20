const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    associations: {
      hasMany: 'posts'
    },

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