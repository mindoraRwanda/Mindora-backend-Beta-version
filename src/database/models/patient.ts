import { Model, DataTypes } from "sequelize";
import sequelize from "../../db";
import User from "./user";

// Define the attributes for the Patient model
interface PatientAttributes {
  id: string;
  userId: string;
  medicalProfile: object;
  personalInformation: object;
  emergencyContact: object;
}

// Define a type for the creation attributes, making `id` optional as it's generated
interface PatientCreationAttributes extends Omit<PatientAttributes, "id"> {}

// Define the Patient model class
class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  public id!: string;
  public userId!: string;
  public medicalProfile!: object;
  public personalInformation!: object;
  public emergencyContact!: object;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Patient model
Patient.init(
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
    medicalProfile: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    personalInformation: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    emergencyContact: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: true,
  }
);

export default Patient;
