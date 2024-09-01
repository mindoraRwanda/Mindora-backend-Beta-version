import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface PostReactionAttributes {
  id: string;
  postId: string;
  commentId?: string;
  userId: string;
  isLike?: boolean;
  isDislike?: boolean;
  emojiType?: string;
}

interface PostReactionCreationAttributes
  extends Optional<
    PostReactionAttributes,
    "id" | "commentId" | "isLike" | "isDislike" | "emojiType"
  > {}

class PostReaction
  extends Model<PostReactionAttributes, PostReactionCreationAttributes>
  implements PostReactionAttributes
{
  public id!: string;
  public postId!: string;
  public commentId?: string;
  public userId!: string;
  public isLike?: boolean;
  public isDislike?: boolean;
  public emojiType?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostReaction.init(
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
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "comments",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    isLike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isDislike: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    emojiType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "post_reactions",
    timestamps: true,
  }
);

export default PostReaction;
