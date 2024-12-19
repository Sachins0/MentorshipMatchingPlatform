'use strict';
const {
  Model
} = require('sequelize');

const bcrypt= require('bcrypt');
const {ServerConfig}= require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Profile,{
        foreignKey: 'userId'
      });
    }
  }
  User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
  }}, 
  {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user){
    const encryptedPassword= bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password= encryptedPassword;
  })

  return User;
};