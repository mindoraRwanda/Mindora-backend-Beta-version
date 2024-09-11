import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the SubscriptionChange model
interface SubscriptionChangeAttributes {
  id: string;
  subscriptionId: string;
  changeType:
    | "upgrade"
    | "downgrade"
    | "cancellation"
    | "reactivation"
    | "pause";
  previousPlanId: string;
  newPlanId?: string;
  changeDate: Date;
  changedBy: string;
  notes?: string;
}

// Define the creation attributes (optional id for auto-generation)
interface SubscriptionChangeCreationAttributes
  extends Optional<SubscriptionChangeAttributes, "id"> {}

// Define the SubscriptionChange model class
class SubscriptionChange
  extends Model<
    SubscriptionChangeAttributes,
    SubscriptionChangeCreationAttributes
  >
  implements SubscriptionChangeAttributes
{
  public id!: string;
  public subscriptionId!: string;
  public changeType!:
    | "upgrade"
    | "downgrade"
    | "cancellation"
    | "reactivation"
    | "pause";
  public previousPlanId!: string;
  public newPlanId?: string;
  public changeDate!: Date;
  public changedBy!: string;
  public notes?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the SubscriptionChange model with the table schema
SubscriptionChange.init(
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
    changeType: {
      type: DataTypes.ENUM(
        "upgrade",
        "downgrade",
        "cancellation",
        "reactivation",
        "pause"
      ),
      allowNull: false,
    },
    previousPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "membership_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    newPlanId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "membership_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    changeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    changedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "subscription_changes",
    timestamps: true,
  }
);

export default SubscriptionChange;
