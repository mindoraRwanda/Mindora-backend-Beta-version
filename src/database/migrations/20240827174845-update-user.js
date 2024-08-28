"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "resetPasswordToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "resetPasswordExpiry", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "resetPasswordToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn("users", "resetPasswordExpiry", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
