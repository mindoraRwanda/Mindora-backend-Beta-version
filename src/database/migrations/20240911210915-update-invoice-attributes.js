"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("invoices", "paidAt");

    await queryInterface.renameColumn(
      "invoices",
      "totalAmount",
      "clientCoverage"
    );

    await queryInterface.addColumn("invoices", "insuranceCoverage", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    // Add back the paidAt column that was removed
    await queryInterface.addColumn("invoices", "paidAt", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    // Revert the renaming of clientCoverage back to totalAmount
    await queryInterface.renameColumn(
      "invoices",
      "clientCoverage",
      "totalAmount"
    );

    // Remove the insuranceCoverage column that was added
    await queryInterface.removeColumn("invoices", "insuranceCoverage");
  },
};
