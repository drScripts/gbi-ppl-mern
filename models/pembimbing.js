"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Pembimbing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembimbing.belongsTo(models.Cabang, {
        as: "cabang",
        foreignKey: "cabangId",
      });
    }
  }
  Pembimbing.init(
    {
      name: DataTypes.STRING,
      cabangId: DataTypes.INTEGER,
      birthday: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Pembimbing",
      paranoid: true,
      timestamps: true,
    }
  );
  return Pembimbing;
};
