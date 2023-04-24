const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const moment = require("moment")

class Category extends Model { }

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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
      }
    }
  },
  {
    associations: {
      hasMany: 'post'
    },

    sequelize: db,
    modelName: "category",
  }
);
// added the association with the post model
Category.associate = (models) => {
  Category.hasMany(models.Post, {
    foreignKey: "category_id",
  });
};

module.exports = Category;