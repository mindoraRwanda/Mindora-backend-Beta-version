import { DataTypes, Model } from "sequelize";
import sequelize from "../../db";
import Role from "./role";
import Permission from "./permission";

interface RolePermissionAttributes {
  roleId: string;
  permissionId: string;
}

class RolePermission
  extends Model<RolePermissionAttributes>
  implements RolePermissionAttributes
{
  public roleId!: string;
  public permissionId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "permissions",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "role_permissions",
    timestamps: true,
  }
);

export default RolePermission;
