import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the Subscription model
interface SubscriptionAttributes {
  id: string;
  userId: string;
  membershipPlanId: string;
  startDate: Date;
  endDate: Date;
  paymentMethod?: string;
  status: "Active" | "Expired" | "Cancelled" | "Paused";
}

// Define the creation attributes (optional id for auto-generation)
interface SubscriptionCreationAttributes
  extends Optional<SubscriptionAttributes, "id"> {}

// Define the Subscription model class
class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: string;
  public userId!: string;
  public membershipPlanId!: string;
  public startDate!: Date;
  public endDate!: Date;
  public paymentMethod?: string;
  public status!: "Active" | "Expired" | "Cancelled" | "Paused";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Subscription model with the table schema
Subscription.init(
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    membershipPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "membership_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Expired", "Cancelled", "Paused"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "subscriptions",
    timestamps: true,
  }
);

export default Subscription;
