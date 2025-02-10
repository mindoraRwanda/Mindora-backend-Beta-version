import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface PermissionAttributes {
  id: string;
  name: string;
  description?: string;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id" | "description"> {}

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id!: string;
  public name!: string;
  public description?: string | undefined;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "permissions",
    timestamps: true,
  }
);

export default Permission;
