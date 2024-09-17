import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ExerciseAttributes {
  id: string;
  title: string;
  description: string;
  difficultyLevel: "Easy" | "Medium" | "Hard";
  category: string;
  picture?: string;
}

interface ExerciseCreationAttributes
  extends Optional<ExerciseAttributes, "id"> {}

class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public difficultyLevel!: "Easy" | "Medium" | "Hard";
  public category!: string;
  public picture?: string | undefined;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Exercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.ENUM("Easy", "Medium", "Hard"),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "exercises",
    timestamps: true,
  }
);

export default Exercise;
