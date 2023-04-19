const { Model, DataTypes } = require("sequelize")
const db = require("../config/connection")

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
},
    {
        sequelize: db,
        modelName: 'comment',
    }
)

module.exports = Comment


