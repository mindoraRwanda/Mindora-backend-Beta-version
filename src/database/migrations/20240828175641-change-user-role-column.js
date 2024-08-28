"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "patient",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.ENUM("patient", "therapist", "admin"),
      allowNull: true,
      defaultValue: "patient",
    });
  },
};
