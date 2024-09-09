import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the CourseEnrollment model
interface CourseEnrollmentAttributes {
  id: string;
  courseId: string;
  userId: string;
  enrolledDate: Date;
  status: string;
  progress: number;
}

// Attributes required during creation (without id)
interface CourseEnrollmentCreationAttributes
  extends Optional<CourseEnrollmentAttributes, "id"> {}

// CourseEnrollment model class
class CourseEnrollment
  extends Model<CourseEnrollmentAttributes, CourseEnrollmentCreationAttributes>
  implements CourseEnrollmentAttributes
{
  public id!: string;
  public courseId!: string;
  public userId!: string;
  public enrolledDate!: Date;
  public status!: string;
  public progress!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CourseEnrollment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "courses", // References the Courses table
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // References the Users table
        key: "id",
      },
    },
    enrolledDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "in_progress", // Possible values: in_progress, completed, etc.
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0, // Progress percentage, defaults to 0%
    },
  },
  {
    sequelize,
    tableName: "course_enrollments",
    timestamps: true,
  }
);

export default CourseEnrollment;
