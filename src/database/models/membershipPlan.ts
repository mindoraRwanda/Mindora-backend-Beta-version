import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface MembershipPlanAttributes {
  id: string;
  name: string;
  features: object; // JSONB type
  price: number;
  billingCycle: "monthly" | "quartely" | "yearly";
  maxAccounts: number;
}

interface MembershipPlanCreationAttributes
  extends Optional<MembershipPlanAttributes, "id"> {}

class MembershipPlan
  extends Model<MembershipPlanAttributes, MembershipPlanCreationAttributes>
  implements MembershipPlanAttributes
{
  public id!: string;
  public name!: string;
  public features!: object;
  public price!: number;
  public billingCycle!: "monthly" | "quartely" | "yearly";
  public maxAccounts!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MembershipPlan.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    billingCycle: {
      type: DataTypes.ENUM("monthly", "quartely", "yearly"),
      allowNull: false,
    },
    maxAccounts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "membership_plans",
    timestamps: true,
  }
);

export default MembershipPlan;
