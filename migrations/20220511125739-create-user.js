"use strict";
const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cabangId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: "cabangs",
          },
        },
        onDelete: "CASCADE",
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      active: {
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

    await queryInterface.addConstraint("Users", {
      fields: ["email"],
      type: "unique",
      name: "UNIQUE_USER_EMAIL",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
