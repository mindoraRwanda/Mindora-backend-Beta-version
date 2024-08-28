"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("chat_members", "id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    });

    await queryInterface.changeColumn("chat_members", "chatId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn("chat_members", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("chat_members", "id");

    await queryInterface.changeColumn("chat_members", "chatId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("chat_members", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },
};
