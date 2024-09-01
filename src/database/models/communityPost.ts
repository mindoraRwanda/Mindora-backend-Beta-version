import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface CommunityPostAttributes {
  id: string;
  communityId: string;
  title: string;
  content?: string;
  isFlagged: boolean;
  createdBy: string;
  attachments?: string[]; // Common attribute for image, video, or article
}

interface CommunityPostCreationAttributes
  extends Optional<CommunityPostAttributes, "id"> {}

class CommunityPost
  extends Model<CommunityPostAttributes, CommunityPostCreationAttributes>
  implements CommunityPostAttributes
{
  public id!: string;
  public communityId!: string;
  public title!: string;
  public content?: string;
  public isFlagged!: boolean;
  public createdBy!: string;
  public attachments?: string[];

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommunityPost.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    communityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "support_communities",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isFlagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      comment: "URL of the attached image, video, or article",
    },
  },
  {
    sequelize,
    tableName: "community_posts",
    timestamps: true,
  }
);

export default CommunityPost;
