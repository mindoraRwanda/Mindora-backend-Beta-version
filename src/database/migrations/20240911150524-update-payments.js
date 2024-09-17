"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("payments", "paymentDate", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the column back to its previous state
    await queryInterface.changeColumn("payments", "paymentDate", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },
};
