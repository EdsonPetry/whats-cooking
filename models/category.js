const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Category extends Model { }

Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  },
  {
    sequelize: db,
    modelName: 'category',
  }
);

module.exports = Category;
