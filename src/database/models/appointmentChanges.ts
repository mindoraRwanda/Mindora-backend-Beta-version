import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface AppointmentChangeAttributes {
  id: string;
  appointmentId: string;
  newStartTime?: string;
  newEndTime?: string;
  reason: string;
  action: "Cancelled" | "Rescheduled";
  actionBy: string;
  actionTime: Date;
}

interface AppointmentChangeCreationAttributes
  extends Optional<AppointmentChangeAttributes, "id"> {}

class AppointmentChange
  extends Model<
    AppointmentChangeAttributes,
    AppointmentChangeCreationAttributes
  >
  implements AppointmentChangeAttributes
{
  public id!: string;
  public appointmentId!: string;
  public newStartTime?: string;
  public newEndTime?: string;
  public reason!: string;
  public action!: "Cancelled" | "Rescheduled";
  public actionBy!: string;
  public actionTime!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AppointmentChange.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    appointmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "appointments",
        key: "id",
      },
    },
    newStartTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    newEndTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("Cancelled", "Rescheduled"),
      allowNull: false,
    },
    actionBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    actionTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointment_changes",
    timestamps: true,
  }
);

export default AppointmentChange;
