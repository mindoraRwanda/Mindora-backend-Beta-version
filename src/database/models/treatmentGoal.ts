import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface TreatmentGoalAttributes {
  id: string;
  treatmentPlanId: string;
  description: string;
  targetDate: Date;
  status: "pending" | "in-progress" | "completed";
}

interface TreatmentGoalCreationAttributes
  extends Optional<TreatmentGoalAttributes, "id"> {}

class TreatmentGoal
  extends Model<TreatmentGoalAttributes, TreatmentGoalCreationAttributes>
  implements TreatmentGoalAttributes
{
  public id!: string;
  public treatmentPlanId!: string;
  public description!: string;
  public targetDate!: Date;
  public status!: "pending" | "in-progress" | "completed";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreatmentGoal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    treatmentPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "treatment_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "treatment_goals",
    timestamps: true,
  }
);

export default TreatmentGoal;
