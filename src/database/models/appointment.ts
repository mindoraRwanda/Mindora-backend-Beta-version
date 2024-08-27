import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface AppointmentAttributes {
  id: string;
  patientId: string;
  therapistId: string;
  startTime: Date;
  endTime: Date;
  location: string;
  appointmentType: string;
  status: "Scheduled" | "Canceled" | "Rescheduled";
  notes?: string;
}

interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id"> {}

class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: string;
  public patientId!: string;
  public therapistId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public location!: string;
  public appointmentType!: string;
  public status!: "Scheduled" | "Canceled" | "Rescheduled";
  public notes?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
    },
    therapistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "Canceled", "Rescheduled"),
      allowNull: false,
      defaultValue: "Scheduled",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: true,
  }
);

export default Appointment;
