"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("articles", "courseId", {
      type: Sequelize.UUID,
      allowNull: true, // Allow null initially
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // Update existing rows
    await queryInterface.sequelize.query(
      'UPDATE "articles" SET "courseId" = $1 WHERE "courseId" IS NULL;',
      {
        bind: ["59e34573-78c0-4381-97e3-3c06934c9266"],
        type: queryInterface.sequelize.QueryTypes.UPDATE,
      }
    );

    // Step 3: Change the column to `NOT NULL` after updating existing rows
    await queryInterface.changeColumn("articles", "courseId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("articles", "courseId");
  },
};
