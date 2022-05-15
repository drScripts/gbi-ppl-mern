"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Absensi.belongsTo(models.Children, {
        as: "children",
      });
    }
  }
  Absensi.init(
    {
      childrenId: DataTypes.INTEGER,
      video: DataTypes.BOOLEAN,
      image: DataTypes.BOOLEAN,
      quiz: DataTypes.BOOLEAN,
      zoom: DataTypes.BOOLEAN,
      aba: DataTypes.INTEGER,
      komsel: DataTypes.BOOLEAN,
      onsite: DataTypes.BOOLEAN,
      sundayDate: DataTypes.STRING,
      fotoId: DataTypes.TEXT,
      videoId: DataTypes.TEXT,
      videoName: DataTypes.TEXT,
      imageName: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Absensi",
      paranoid: true,
      timestamps: true,
    }
  );
  return Absensi;
};
