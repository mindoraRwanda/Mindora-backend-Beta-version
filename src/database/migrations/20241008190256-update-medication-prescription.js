"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("medication_prescriptions", "patientId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.changeColumn(
      "medication_prescriptions",
      "therapistId",
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "therapists",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    );

    await queryInterface.changeColumn(
      "medication_prescriptions",
      "medicationId",
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "medications",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("medication_prescriptions", "patientId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    });

    await queryInterface.changeColumn(
      "medication_prescriptions",
      "therapistId",
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "therapists",
          key: "id",
        },
      }
    );

    await queryInterface.changeColumn(
      "medication_prescriptions",
      "medicationId",
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "medications",
          key: "id",
        },
      }
    );
  },
};
