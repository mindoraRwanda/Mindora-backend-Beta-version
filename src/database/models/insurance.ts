import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface InsuranceAttributes {
  id: string;
  name: string;
  contract?: string;
}

interface InsuranceCreationAttributes
  extends Optional<InsuranceAttributes, "id"> {}

class Insurance
  extends Model<InsuranceAttributes, InsuranceCreationAttributes>
  implements InsuranceAttributes
{
  public id!: string;
  public name!: string;
  public contract?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Insurance.init(
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
    contract: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "insurances",
    timestamps: true,
  }
);

export default Insurance;
