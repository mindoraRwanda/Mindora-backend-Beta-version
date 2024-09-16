import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define attributes for the junction model
interface InsuranceServiceCoverageAttributes {
  id: string;
  insuranceId: string;
  serviceId: string;
  coveragePercentage: number;
}

// Define creation attributes for the junction model
interface InsuranceServiceCoverageCreationAttributes
  extends Optional<InsuranceServiceCoverageAttributes, "id"> {}

// Define the InsuranceServiceCoverage model
class InsuranceServiceCoverage
  extends Model<
    InsuranceServiceCoverageAttributes,
    InsuranceServiceCoverageCreationAttributes
  >
  implements InsuranceServiceCoverageAttributes
{
  public id!: string;
  public insuranceId!: string;
  public serviceId!: string;
  public coveragePercentage!: number;
}

// Initialize the model with attributes and options
InsuranceServiceCoverage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    insuranceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "insurances",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "services",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    coveragePercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "insurance_service_coverages",
    timestamps: false,
  }
);

export default InsuranceServiceCoverage;
