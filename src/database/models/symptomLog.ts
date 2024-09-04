import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface SymptomLogAttributes {
  id: string;
  userId: string;
  symptom: string;
  severity: "mild" | "moderate" | "severe"; // Adjust values as needed
  frequency: "rare" | "occasional" | "frequent" | "constant"; // Adjust values as needed
  onset: Date;
  description?: string;
  logDate: Date;
}

interface SymptomLogCreationAttributes
  extends Optional<SymptomLogAttributes, "id" | "description"> {}

class SymptomLog
  extends Model<SymptomLogAttributes, SymptomLogCreationAttributes>
  implements SymptomLogAttributes
{
  public id!: string;
  public userId!: string;
  public symptom!: string;
  public severity!: "mild" | "moderate" | "severe";
  public frequency!: "rare" | "occasional" | "frequent" | "constant";
  public onset!: Date;
  public description?: string;
  public logDate!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SymptomLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    symptom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM("mild", "moderate", "severe"),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM("rare", "occasional", "frequent", "constant"),
      allowNull: false,
    },
    onset: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "symptom_logs",
    timestamps: true,
  }
);

export default SymptomLog;
