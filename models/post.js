const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const User = require('./user');
const { timeStamp } = require("console");
const moment = require('moment')


class Post extends Model { }

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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY');
      }
    }
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
