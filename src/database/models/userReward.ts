import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface UserRewardAttributes {
  id: string;
  userId: string;
  rewardId: string;
}

interface UserRewardCreationAttributes
  extends Optional<UserRewardAttributes, "id"> {}

class UserReward
  extends Model<UserRewardAttributes, UserRewardCreationAttributes>
  implements UserRewardAttributes
{
  public id!: string;
  public userId!: string;
  public rewardId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserReward.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    rewardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "rewards",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "user_rewards",
    timestamps: true,
  }
);

export default UserReward;
