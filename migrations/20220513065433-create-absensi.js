"use strict";
const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Absensis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      childrenId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: {
            tableName: "children",
          },
        },
        onDelete: "SET NULL",
      },
      video: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      image: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      quiz: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      zoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      aba: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      komsel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      onsite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sundayDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fotoId: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      videoId: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      videoName: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imageName: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        onDelete: "SET NULL",
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        onDelete: "SET NULL",
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("Absensis");
  },
};
