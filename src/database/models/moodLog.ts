import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the MoodLog model
interface MoodLogAttributes {
  id: string;
  userId: string;
  mood: string;
  rating: number;
  condition?: string;
  description?: string;
}

// Define the attributes required when creating a new MoodLog
interface MoodLogCreationAttributes
  extends Optional<MoodLogAttributes, "id" | "condition" | "description"> {}

class MoodLog
  extends Model<MoodLogAttributes, MoodLogCreationAttributes>
  implements MoodLogAttributes
{
  public id!: string;
  public userId!: string;
  public mood!: string;
  public rating!: number;
  public condition?: string;
  public description?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MoodLog.init(
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
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "mood_logs",
    timestamps: true,
  }
);

export default MoodLog;
