import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the ProgressReport model
interface ProgressReportAttributes {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  moodSummary: object; // Using object type for JSONB
  symptomSummary: object; // Using object type for JSONB
}

// Define the attributes required when creating a new ProgressReport
interface ProgressReportCreationAttributes
  extends Optional<ProgressReportAttributes, "id"> {}

class ProgressReport
  extends Model<ProgressReportAttributes, ProgressReportCreationAttributes>
  implements ProgressReportAttributes
{
  public id!: string;
  public userId!: string;
  public startDate!: Date;
  public endDate!: Date;
  public moodSummary!: object;
  public symptomSummary!: object;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProgressReport.init(
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
      },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    moodSummary: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    symptomSummary: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "progress_reports",
    timestamps: true,
  }
);

export default ProgressReport;
