import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface AppointmentAvailableSlotsAttributes {
  id: string;
  therapistId: string;
  availableDay: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  date?: Date;
  timeZone: string;
}

interface AppointmentAvailableSlotsCreationAttributes
  extends Optional<AppointmentAvailableSlotsAttributes, "id"> {}

class AppointmentAvailableSlots
  extends Model<
    AppointmentAvailableSlotsAttributes,
    AppointmentAvailableSlotsCreationAttributes
  >
  implements AppointmentAvailableSlotsAttributes
{
  public id!: string;
  public therapistId!: string;
  public availableDay!: string;
  public startTime!: string;
  public endTime!: string;
  public recurring!: boolean;
  public date?: Date;
  public timeZone!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AppointmentAvailableSlots.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    therapistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
    },
    availableDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointment_available_slots",
    timestamps: true,
  }
);

export default AppointmentAvailableSlots;
