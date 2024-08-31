"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("exercise_questions", "points", {
      type: Sequelize.FLOAT,
      allowNull: true, // Allow nulls temporarily
    });

    // Set a default value for existing rows
    await queryInterface.sequelize.query(
      'UPDATE "exercise_questions" SET "points" = 0 WHERE "points" IS NULL;'
    );

    // Alter the column to disallow nulls
    await queryInterface.changeColumn("exercise_questions", "points", {
      type: Sequelize.FLOAT,
      allowNull: false, // Now disallow nulls
    });

    await queryInterface.addColumn("exercise_questions", "status", {
      type: Sequelize.ENUM("passed", "failed"),
      allowNull: false,
      defaultValue: "failed",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("exercise_questions", "points");
    await queryInterface.removeColumn("exercise_questions", "status");

    // Optionally remove the ENUM type if it's not used elsewhere
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_exercise_questions_status";'
    );
  },
};
