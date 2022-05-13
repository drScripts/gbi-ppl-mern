"use strict";
const { QueryInterface, Sequelize } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Children", {
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
      code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pembimbingId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "pembimbings",
          },
        },
        allowNull: false,
      },
      kelasId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "kelas",
          },
        },
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        allowNull: true,
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
    await queryInterface.dropTable("Children");
  },
};
