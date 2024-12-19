'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Connection,{
        as: 'mentor', 
        foreignKey: 'mentorId'
      });
      this.hasMany(models.Connection,{
        as: 'mentee', 
        foreignKey: 'menteeId'
      });
    }
  }
  Profile.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['mentor', 'mentee'],
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT
    },
    interests: {
      type: DataTypes.JSON
    },
    skills: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};