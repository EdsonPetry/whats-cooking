const {Model, DataTypes} = require('sequelize')
const db = require(../config/connection)

class User extends Model{}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        hooks:{
            async beforeCreate(User){
                const encryptedPassword = await bcrypt.hash(User.password, 10)
                User.password = encryptedPassword

            }

        }
    }
   
   
},{
    sequelize.db,
    modelName:'user'

})

module.exports = User
