import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface TreatmentPlanAttributes {
  id: string;
  patientId: string;
  therapistId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status?: "Pending" | "Ongoing" | "Completed" | "Cancelled";
}

interface TreatmentPlanCreationAttributes
  extends Optional<TreatmentPlanAttributes, "id" | "status" | "endDate"> {}

class TreatmentPlan
  extends Model<TreatmentPlanAttributes, TreatmentPlanCreationAttributes>
  implements TreatmentPlanAttributes
{
  public id!: string;
  public patientId!: string;
  public therapistId!: string;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate?: Date;
  public status!: "Pending" | "Ongoing" | "Completed" | "Cancelled";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreatmentPlan.init(
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    therapistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Ongoing", "Completed", "Cancelled"),
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    tableName: "treatment_plans",
    timestamps: true,
  }
);

export default TreatmentPlan;
