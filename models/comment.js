const { Model, DataTypes } = require("sequelize")
const db = require("../config/connection")
const moment = require('moment')

class Comment extends Model { }

Comment.init({
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
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
        sequelize: db,
        modelName: 'comment',
    }
)

module.exports = Comment


