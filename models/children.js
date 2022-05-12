'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Children extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Children.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    pembimbingId: DataTypes.INTEGER,
    kelasId: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Children',
  });
  return Children;
};