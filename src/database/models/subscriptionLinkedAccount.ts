import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface SubscriptionLinkedAccountAttributes {
  id: string;
  subscriptionId: string;
  userId: string;
}

interface SubscriptionLinkedAccountCreationAttributes
  extends Optional<SubscriptionLinkedAccountAttributes, "id"> {}

class SubscriptionLinkedAccount
  extends Model<
    SubscriptionLinkedAccountAttributes,
    SubscriptionLinkedAccountCreationAttributes
  >
  implements SubscriptionLinkedAccountAttributes
{
  public id!: string;
  public subscriptionId!: string;
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubscriptionLinkedAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "subscriptions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "subscription_linked_accounts",
    timestamps: true,
  }
);

export default SubscriptionLinkedAccount;
