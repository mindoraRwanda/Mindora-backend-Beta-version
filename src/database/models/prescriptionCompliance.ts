import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes interface
interface PrescriptionComplianceAttributes {
  id: string;
  prescriptionId: string;
  patientId: string;
  date: Date;
  status: "Taken" | "Missed" | "Skipped";
  notes?: string;
}

// Define the creation attributes interface
interface PrescriptionComplianceCreationAttributes
  extends Optional<PrescriptionComplianceAttributes, "id"> {}

// Define the model class
class PrescriptionCompliance
  extends Model<
    PrescriptionComplianceAttributes,
    PrescriptionComplianceCreationAttributes
  >
  implements PrescriptionComplianceAttributes
{
  public id!: string;
  public prescriptionId!: string;
  public patientId!: string;
  public date!: Date;
  public status!: "Taken" | "Missed" | "Skipped";
  public notes?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
PrescriptionCompliance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    prescriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "medication_prescriptions",
        key: "id",
      },
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Taken", "Missed", "Skipped"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "prescription_compliance",
    timestamps: true,
  }
);

export default PrescriptionCompliance;
