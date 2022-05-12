"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPermissionRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPermissionRequest.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  UserPermissionRequest.init(
    {
      userId: DataTypes.INTEGER,
      requestAs: {
        type: DataTypes.ENUM,
        values: ["admin", "superadmin", "user"],
      },
    },
    {
      sequelize,
      modelName: "UserPermissionRequest",
    }
  );
  return UserPermissionRequest;
};
