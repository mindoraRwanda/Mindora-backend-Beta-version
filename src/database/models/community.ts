import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface SupportCommunityAttributes {
  id: string;
  moderatorId: string;
  name: string;
  profile?: string;
  description: string;
  isPrivate: boolean;
}

interface SupportCommunityCreationAttributes
  extends Optional<SupportCommunityAttributes, "id" | "profile"> {}

class SupportCommunity
  extends Model<SupportCommunityAttributes, SupportCommunityCreationAttributes>
  implements SupportCommunityAttributes
{
  public id!: string;
  public moderatorId!: string;
  public name!: string;
  public profile?: string | undefined;
  public description!: string;
  public isPrivate!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SupportCommunity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    moderatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "support_communities",
    timestamps: true,
  }
);

export default SupportCommunity;
