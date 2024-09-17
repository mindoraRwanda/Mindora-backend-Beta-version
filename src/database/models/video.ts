import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the Video model
interface VideoAttributes {
  id: string;
  courseId: string;
  title: string;
  description: string;
  url: string;
  publishedDate: Date;
  category: string;
  duration: number; // duration in seconds
  thumbnail?: string;
}

// Attributes required during creation (without id)
interface VideoCreationAttributes
  extends Optional<VideoAttributes, "id" | "duration"> {}

// Video model class
class Video
  extends Model<VideoAttributes, VideoCreationAttributes>
  implements VideoAttributes
{
  public id!: string;
  public courseId!: string;
  public title!: string;
  public description!: string;
  public url!: string;
  public publishedDate!: Date;
  public category!: string;
  public duration!: number;
  public thumbnail?: string | undefined;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Video.init(
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
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // duration in seconds
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "videos",
    timestamps: true,
  }
);

export default Video;
