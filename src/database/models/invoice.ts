import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface InvoiceAttributes {
  id: string;
  userId: string;
  services: object | undefined;
  clientCoverage: number;
  insuranceCoverage?: number;
  status: "Pending" | "Paid" | "Overdue";
  dueDate: Date;
}

interface InvoiceCreationAttributes extends Optional<InvoiceAttributes, "id"> {}

class Invoice
  extends Model<InvoiceAttributes, InvoiceCreationAttributes>
  implements InvoiceAttributes
{
  public id!: string;
  public userId!: string;
  public services!: object;
  public clientCoverage!: number;
  public insuranceCoverage?: number;
  public status!: "Pending" | "Paid" | "Overdue";
  public dueDate!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Invoice.init(
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
    services: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    clientCoverage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    insuranceCoverage: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Paid", "Overdue"),
      allowNull: false,
      defaultValue: "Pending",
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "invoices",
    timestamps: true,
  }
);

export default Invoice;
