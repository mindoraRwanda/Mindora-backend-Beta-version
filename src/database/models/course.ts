import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the Course model
interface CourseAttributes {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: number;
  level?: string;
  price: number;
}

// Attributes required during creation (without id)
interface CourseCreationAttributes extends Optional<CourseAttributes, "id"> {}

// Course model class
class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public instructor!: string;
  public category!: string;
  public duration!: number;
  public level?: string;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
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
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes or hours
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Basic",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: "courses",
    timestamps: true,
  }
);

export default Course;
