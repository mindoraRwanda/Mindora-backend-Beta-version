import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db"; // Adjust the path as necessary

interface TreatmentMilestoneAttributes {
  id: string;
  goalId: string;
  description: string;
  targetDate: Date;
  status: "pending" | "in-progress" | "completed";
}

interface TreatmentMilestoneCreationAttributes
  extends Optional<TreatmentMilestoneAttributes, "id"> {}

class TreatmentMilestone
  extends Model<
    TreatmentMilestoneAttributes,
    TreatmentMilestoneCreationAttributes
  >
  implements TreatmentMilestoneAttributes
{
  public id!: string;
  public goalId!: string;
  public description!: string;
  public targetDate!: Date;
  public status!: "pending" | "in-progress" | "completed";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreatmentMilestone.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    goalId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "treatment_goals",
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
    tableName: "treatment_milestones",
    timestamps: true,
  }
);

export default TreatmentMilestone;
