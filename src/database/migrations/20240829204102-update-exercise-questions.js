"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("exercise_questions", "exerciseId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "exercises",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("exercise_questions", "exerciseId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
