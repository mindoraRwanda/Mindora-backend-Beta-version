import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface CommentAttributes {
  id: string;
  postId: string;
  parentCommentId?: string;
  content?: string;
  attachments?: string[] | null;
  isFlagged?: boolean;
  createdBy: string;
}

interface CommentCreationAttributes
  extends Optional<
    CommentAttributes,
    "id" | "parentCommentId" | "content" | "attachments" | "isFlagged"
  > {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: string;
  public postId!: string;
  public parentCommentId?: string;
  public content?: string;
  public attachments?: string[];
  public isFlagged?: boolean;
  public createdBy!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "community_posts",
        key: "id",
      },
    },
    parentCommentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "comments",
        key: "id",
      },
      comment: "Self-referencing field to create nested comments",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      comment: "URL to the attached file (image, video, etc.)",
    },
    isFlagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  }
);

export default Comment;
