"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_preferences", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      preferredLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "en",
      },
      communicationMethods: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          allowPhoneCalls: false,
          allowVideoCalls: false,
          allowChatting: true,
        },
      },
      notificationSettings: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          notifyBySMS: false,
          notifyByEmail: true,
          notifyByPush: true,
        },
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
    await queryInterface.dropTable("user_preferences");
  },
};
