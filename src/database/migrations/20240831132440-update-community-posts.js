"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("community_posts", "attachment");

    await queryInterface.addColumn("community_posts", "attachments", {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
      comment: "URL of the attached image, video, or article",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("community_posts", "attachments");
  },
};
