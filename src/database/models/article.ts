import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the Article model
interface ArticleAttributes {
  id: string;
  courseId: string;
  title: string;
  content: object;
  author: string;
  category: string;
  publishedDate: Date;
  picture?: string;
}

// Attributes required during creation (without id)
interface ArticleCreationAttributes extends Optional<ArticleAttributes, "id"> {}

// Article model class
class Article
  extends Model<ArticleAttributes, ArticleCreationAttributes>
  implements ArticleAttributes
{
  public id!: string;
  public courseId!: string;
  public title!: string;
  public content!: object;
  public author!: string;
  public category!: string;
  public publishedDate!: Date;
  public picture?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
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
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "articles",
    timestamps: true,
  }
);

export default Article;
