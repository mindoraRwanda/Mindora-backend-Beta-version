"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("appointment_changes", "appointmentId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "appointments",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("appointment_changes", "appointmentId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
