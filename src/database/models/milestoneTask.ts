import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db"; // Adjust the path as necessary

interface MilestoneTaskAttributes {
  id: string;
  milestoneId: string;
  description: string;
  targetDate: Date;
  status: "pending" | "in-progress" | "completed";
}

interface MilestoneTaskCreationAttributes
  extends Optional<MilestoneTaskAttributes, "id"> {}

class MilestoneTask
  extends Model<MilestoneTaskAttributes, MilestoneTaskCreationAttributes>
  implements MilestoneTaskAttributes
{
  public id!: string;
  public milestoneId!: string;
  public description!: string;
  public targetDate!: Date;
  public status!: "pending" | "in-progress" | "completed";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MilestoneTask.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    milestoneId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "treatment_milestones",
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
    tableName: "milestone_tasks",
    timestamps: true,
  }
);

export default MilestoneTask;
