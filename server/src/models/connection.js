'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Profile,{
        as: 'mentor', 
        foreignKey: 'mentorId'
      });
      this.belongsTo(models.Profile,{
        as: 'mentee', 
        foreignKey: 'menteeId'
      });
    }
  }
  Connection.init({
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  menteeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'accepted', 'rejected'],
    defaultValue: 'pending'
  }
  }, {
    sequelize,
    modelName: 'Connection',
  });
  return Connection;
};