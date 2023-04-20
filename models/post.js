const { Model, DataTypes } = require('sequelize')
const db = require('../config/connection')

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    associations: {
        belongsTo: 'users',
        belongsTo: 'categories'

    },
    sequelize: db,
    modelName: 'post'
})


module.exports = Post