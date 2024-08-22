"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "id");

    await queryInterface.changeColumn("users", "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "username", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.changeColumn("users", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("users", "profileImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "user",
    });
    // Add createdAt and updatedAt columns
    await queryInterface.changeColumn("users", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });

    await queryInterface.changeColumn("users", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
