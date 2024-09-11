"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscription_changes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      changeType: {
        type: Sequelize.ENUM(
          "upgrade",
          "downgrade",
          "cancellation",
          "reactivation",
          "pause"
        ),
        allowNull: false,
      },
      previousPlanId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "membership_plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      newPlanId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "membership_plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      changeDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      changedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("subscription_changes");
  },
};
