"use strict";
const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserControls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        onDelete: "CASCADE",
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "superadmin", "user"],
        defaultValue: "user",
      },
      quiz: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      aba: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      komsel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      zoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      video: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      onsite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserControls");
  },
};
