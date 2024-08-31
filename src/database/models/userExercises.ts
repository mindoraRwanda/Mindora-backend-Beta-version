import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface UserExerciseAttributes {
  id: string;
  userId: string;
  exerciseId: string;
  score: number;
  progress: number;
  status: "Pending" | "InProgress" | "Completed";
  completedAt?: Date;
}

interface UserExerciseCreationAttributes
  extends Optional<UserExerciseAttributes, "id" | "completedAt"> {}

class UserExercise
  extends Model<UserExerciseAttributes, UserExerciseCreationAttributes>
  implements UserExerciseAttributes
{
  public id!: string;
  public userId!: string;
  public exerciseId!: string;
  public score!: number;
  public progress!: number;
  public status!: "Pending" | "InProgress" | "Completed";
  public completedAt?: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserExercise.init(
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
        model: "users", // name of the target table
        key: "id", // key in the target table that is referenced
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "exercises",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "InProgress", "Completed"),
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_exercises",
    timestamps: true,
  }
);

export default UserExercise;
