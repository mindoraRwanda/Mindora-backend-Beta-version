import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface FutureIntegrationAttributes {
  id: string;
  ehrSystemName: string;
  apiEndPoint: string;
  authMethod?: string;
  lastSyncTime?: Date;
  status?: "active" | "inactive";
}

interface FutureIntegrationCreationAttributes
  extends Optional<FutureIntegrationAttributes, "id"> {}

class FutureIntegration
  extends Model<
    FutureIntegrationAttributes,
    FutureIntegrationCreationAttributes
  >
  implements FutureIntegrationAttributes
{
  public id!: string;
  public ehrSystemName!: string;
  public apiEndPoint!: string;
  public authMethod?: string;
  public lastSyncTime?: Date;
  public status!: "active" | "inactive";

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FutureIntegration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    ehrSystemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiEndPoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastSyncTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "inactive",
    },
  },
  {
    sequelize,
    tableName: "ehr_future_integrations",
    timestamps: true,
  }
);

export default FutureIntegration;
