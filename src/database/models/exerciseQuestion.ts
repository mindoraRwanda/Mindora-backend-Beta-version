import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ExerciseQuestionAttributes {
  id: string;
  exerciseId: string;
  question: string;
  correctAnswer: string;
  points: number;
  status?: "passed" | "failed";
}

interface ExerciseQuestionCreationAttributes
  extends Optional<ExerciseQuestionAttributes, "id"> {}

class ExerciseQuestion
  extends Model<ExerciseQuestionAttributes, ExerciseQuestionCreationAttributes>
  implements ExerciseQuestionAttributes
{
  public id!: string;
  public exerciseId!: string;
  public question!: string;
  public correctAnswer!: string;
  public points!: number;
  public status?: "passed" | "failed";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ExerciseQuestion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "exercises",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("passed", "failed"),
      allowNull: false,
      defaultValue: "failed",
    },
  },
  {
    sequelize,
    tableName: "exercise_questions",
    timestamps: true,
  }
);

export default ExerciseQuestion;
