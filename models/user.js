const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../config/connection");
const moment = require('moment')

class User extends Model {
  async validatePass(provided_password) {
    const is_valid = await bcrypt.compare(provided_password, this.password);

    return is_valid;
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY');
      }
    }
  },
  {
    sequelize: db,
    modelName: "user",
    hooks: {
      async beforeCreate(User) {
        const encryptedPassword = await bcrypt.hash(User.password, 10);
        User.password = encryptedPassword;
      },
    },
  }
);

module.exports = User;
