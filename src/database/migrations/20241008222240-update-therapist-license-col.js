"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("therapists", "licence", "license");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("therapists", "license", "licence");
  },
};
