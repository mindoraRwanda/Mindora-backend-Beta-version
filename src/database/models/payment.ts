import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface PaymentAttributes {
  id: string;
  userId: string;
  invoiceId: string;
  paymentMethod:
    | "Credit Card"
    | "Debit Card"
    | "Bank Transfer"
    | "Mobile Money"
    | "PayPal";
  amount: number;
  paymentDate?: Date;
  confirmed?: boolean;
  insuranceClaimStatus?: "Pending" | "Approved" | "Rejected" | "Not Applicable";
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: string;
  public userId!: string;
  public invoiceId!: string;
  public paymentMethod!:
    | "Credit Card"
    | "Debit Card"
    | "Bank Transfer"
    | "Mobile Money"
    | "PayPal";
  public amount!: number;
  public paymentDate!: Date;
  public confirmed!: boolean;
  public insuranceClaimStatus?:
    | "Pending"
    | "Approved"
    | "Rejected"
    | "Not Applicable";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
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
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    paymentMethod: {
      type: DataTypes.ENUM(
        "Credit Card",
        "Debit Card",
        "Bank Transfer",
        "Mobile Money",
        "PayPal"
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    insuranceClaimStatus: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected", "Not Applicable"),
      defaultValue: "Not Applicable",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
  }
);

export default Payment;
