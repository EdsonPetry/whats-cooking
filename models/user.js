const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt');
const db = require('../config/connection')

class User extends Model{
    async validatePass(provided_password) {
      const is_valid = await bcrypt.compare(provided_password, this.password);
  
      return is_valid;
    }
  }

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        
    }
   
   
},{
    
    sequelize: db,
    modelName:'user',
    hooks:{
        async beforeCreate(User){
            const encryptedPassword = await bcrypt.hash(User.password, 10)
            User.password = encryptedPassword

        }

    }

})

module.exports = User
