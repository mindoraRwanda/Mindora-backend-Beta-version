"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("community_moderation_actions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "community_posts",
          key: "id",
        },
      },
      commentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "comments",
          key: "id",
        },
      },
      actionTaken: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("community_moderation_actions");
  },
};
