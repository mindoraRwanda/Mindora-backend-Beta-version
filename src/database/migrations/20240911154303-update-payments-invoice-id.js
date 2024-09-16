"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("payments", "invoiceId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("payments", "invoiceId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
    });
  },
};
