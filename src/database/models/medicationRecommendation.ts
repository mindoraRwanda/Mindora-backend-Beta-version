import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes interface
interface MedicationRecommendationAttributes {
  id: string;
  patientId: string;
  recommendation: object; // JSONB type in PostgreSQL
  reason: string;
}

// Define the creation attributes interface
interface MedicationRecommendationCreationAttributes
  extends Optional<MedicationRecommendationAttributes, "id"> {}

// Define the model class
class MedicationRecommendation
  extends Model<
    MedicationRecommendationAttributes,
    MedicationRecommendationCreationAttributes
  >
  implements MedicationRecommendationAttributes
{
  public id!: string;
  public patientId!: string;
  public recommendation!: object;
  public reason!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
MedicationRecommendation.init(
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
    },
    recommendation: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medication_recommendations",
    timestamps: true,
  }
);

export default MedicationRecommendation;
