"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Children extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Children.belongsTo(models.Pembimbing, {
        as: "pembimbing",
        foreignKey: "pembimbingId",
      });

      Children.belongsTo(models.Kelas, {
        as: "kelas",
        foreignKey: "kelasId",
      });

      Children.belongsTo(models.User, {
        as: "created",
        foreignKey: "createdBy",
      });

      Children.belongsTo(models.User, {
        as: "updated",
        foreignKey: "updatedBy",
      });

      Children.belongsTo(models.User, {
        as: "deleted",
        foreignKey: "deletedBy",
      });
    }
  }
  Children.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      pembimbingId: DataTypes.INTEGER,
      kelasId: DataTypes.INTEGER,
      birthday: DataTypes.DATEONLY,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Children",
      paranoid: true,
      timestamps: true,
    }
  );
  return Children;
};
