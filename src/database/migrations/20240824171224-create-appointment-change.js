"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointment_changes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      appointmentId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      newStartTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      newEndTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      action: {
        type: Sequelize.ENUM("Cancelled", "Rescheduled"),
        allowNull: false,
      },
      actionBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      actionTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("appointment_changes");
  },
};
