import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface UserExerciseResponseAttributes {
  id: string;
  userExerciseId: string;
  questionId: string;
  response: string;
  isCorrect: boolean;
}

interface UserExerciseResponseCreationAttributes
  extends Optional<UserExerciseResponseAttributes, "id"> {}

class UserExerciseResponse
  extends Model<
    UserExerciseResponseAttributes,
    UserExerciseResponseCreationAttributes
  >
  implements UserExerciseResponseAttributes
{
  public id!: string;
  public userExerciseId!: string;
  public questionId!: string;
  public response!: string;
  public isCorrect!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserExerciseResponse.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userExerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user_exercises",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "exercise_questions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "user_exercise_responses",
    timestamps: true,
  }
);

export default UserExerciseResponse;
