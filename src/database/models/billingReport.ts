import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface BillingReportAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalOutstandingBalance: number;
  approvedInsuranceClaims: number;
  pendingInsuranceClaims: number;
  rejectedInsuranceClaims: number;
}

interface BillingReportCreationAttributes
  extends Optional<BillingReportAttributes, "id"> {}

class BillingReport
  extends Model<BillingReportAttributes, BillingReportCreationAttributes>
  implements BillingReportAttributes
{
  public id!: string;
  public startDate!: Date;
  public endDate!: Date;
  public totalRevenue!: number;
  public totalOutstandingBalance!: number;
  public approvedInsuranceClaims!: number;
  public pendingInsuranceClaims!: number;
  public rejectedInsuranceClaims!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillingReport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalOutstandingBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    approvedInsuranceClaims: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    pendingInsuranceClaims: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    rejectedInsuranceClaims: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "billing_reports",
    timestamps: true,
  }
);

export default BillingReport;
