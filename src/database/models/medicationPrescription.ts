import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface MedicationPrescriptionAttributes {
  id: string;
  patientId: string;
  therapistId: string;
  medicationId: string;
  dosage: string;
  duration?: string;
  startDate?: Date;
  endDate?: Date;
  status?: "Active" | "Completed" | "Discontinued";
  notes?: string;
}

interface MedicationPrescriptionCreationAttributes
  extends Optional<MedicationPrescriptionAttributes, "id"> {}

class MedicationPrescription
  extends Model<
    MedicationPrescriptionAttributes,
    MedicationPrescriptionCreationAttributes
  >
  implements MedicationPrescriptionAttributes
{
  public id!: string;
  public patientId!: string;
  public therapistId!: string;
  public medicationId!: string;
  public dosage!: string;
  public duration?: string;
  public startDate?: Date;
  public endDate?: Date;
  public status?: "Active" | "Completed" | "Discontinued";
  public notes?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicationPrescription.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    therapistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    medicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "medications",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Discontinued"),
      allowNull: false,
      defaultValue: "Active",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "medication_prescriptions",
    timestamps: true,
  }
);

export default MedicationPrescription;
