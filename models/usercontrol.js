"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserControl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserControl.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  UserControl.init(
    {
      userId: DataTypes.INTEGER,
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "superadmin", "user"],
      },
      quiz: DataTypes.BOOLEAN,
      aba: DataTypes.BOOLEAN,
      komsel: DataTypes.BOOLEAN,
      zoom: DataTypes.BOOLEAN,
      image: DataTypes.BOOLEAN,
      video: DataTypes.BOOLEAN,
      onsite: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserControl",
      timestamps: true,
      paranoid: true,
    }
  );
  return UserControl;
};
