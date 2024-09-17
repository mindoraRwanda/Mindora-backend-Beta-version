import { DataTypes, Model } from "sequelize";
import sequelize from "../../db";

interface PatientInsuranceAttributes {
  patientId: string;
  insuranceId: string;
  verified: boolean;
  expiryDate?: Date;
  status: "active" | "expired";
}

class PatientInsurance
  extends Model<PatientInsuranceAttributes>
  implements PatientInsuranceAttributes
{
  public patientId!: string;
  public insuranceId!: string;
  public verified!: boolean;
  public expiryDate?: Date;
  public status!: "active" | "expired";
}

PatientInsurance.init(
  {
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "expired"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "patient_insurances",
    timestamps: false,
  }
);

export default PatientInsurance;
