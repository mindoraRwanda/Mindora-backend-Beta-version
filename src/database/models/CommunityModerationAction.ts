import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface CommunityModerationActionAttributes {
  id: string;
  postId: string;
  commentId?: string;
  actionTaken: string;
  actionBy: string;
  reason: string;
}

interface CommunityModerationActionCreationAttributes
  extends Optional<CommunityModerationActionAttributes, "id" | "commentId"> {}

class CommunityModerationAction
  extends Model<
    CommunityModerationActionAttributes,
    CommunityModerationActionCreationAttributes
  >
  implements CommunityModerationActionAttributes
{
  public id!: string;
  public postId!: string;
  public commentId?: string;
  public actionTaken!: string;
  public actionBy!: string;
  public reason!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommunityModerationAction.init(
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
    actionTaken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actionBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "community_moderation_actions",
    timestamps: true,
  }
);

export default CommunityModerationAction;
