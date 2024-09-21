import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes of the UserCommunity model
interface UserCommunityAttributes {
  communityId: string;
  userId: string;
  joinedAt?: Date;
  role: "member" | "moderator" | "admin";
  status: "active" | "inactive" | "banned";
}

// Define the optional fields during creation
interface UserCommunityCreationAttributes
  extends Optional<UserCommunityAttributes, "joinedAt" | "status"> {}

// Create the model class for UserCommunity
class UserCommunity
  extends Model<UserCommunityAttributes, UserCommunityCreationAttributes>
  implements UserCommunityAttributes
{
  public communityId!: string;
  public userId!: string;
  public joinedAt?: Date;
  public role!: "member" | "moderator" | "admin";
  public status!: "active" | "inactive" | "banned";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
UserCommunity.init(
  {
    communityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "support_communities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM("member", "moderator", "admin"),
      allowNull: false,
      defaultValue: "member",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "banned"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "user_communities",
    timestamps: true,
  }
);

export default UserCommunity;
