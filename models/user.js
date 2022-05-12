"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Cabang, {
        as: "cabang",
        foreignKey: "cabangId",
      });

      User.hasOne(models.UserControl, {
        as: "userControl",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cabangId: DataTypes.INTEGER,
      password: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      paranoid: true,
    }
  );
  return User;
};
