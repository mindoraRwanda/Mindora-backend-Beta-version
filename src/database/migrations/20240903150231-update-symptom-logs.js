"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add the column with `allowNull: true`
    await queryInterface.addColumn("symptom_logs", "logDate", {
      type: Sequelize.DATEONLY,
      allowNull: true, // Allow null initially
    });

    // Step 2: Update existing rows with a default date
    await queryInterface.sequelize.query(
      'UPDATE "symptom_logs" SET "logDate" = $1 WHERE "logDate" IS NULL;',
      {
        bind: ["2024-09-02"], // Use DATEONLY format
        type: queryInterface.sequelize.QueryTypes.UPDATE,
      }
    );

    // Step 3: Change the column to `NOT NULL` after updating existing rows
    await queryInterface.changeColumn("symptom_logs", "logDate", {
      type: Sequelize.DATEONLY,
      allowNull: false, // Make NOT NULL
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("symptom_logs", "logDate");
  },
};
