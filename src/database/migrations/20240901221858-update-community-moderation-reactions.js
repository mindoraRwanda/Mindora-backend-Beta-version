"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("community_moderation_actions", "reason", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "community_moderation_actions",
      "reason",
      {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    );
  },
};
