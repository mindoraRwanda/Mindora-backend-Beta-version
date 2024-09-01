"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("post_reactions", {
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
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      isLike: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isDislike: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      emojiType: {
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
    await queryInterface.dropTable("post_reactions");
  },
};
