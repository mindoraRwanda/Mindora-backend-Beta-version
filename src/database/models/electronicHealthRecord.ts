import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ElectronicHealthRecordAttributes {
  id: string;
  patientId: string;
  therapistId: string;
  recordType: string;
  recordData: object; // JSONB field
}

interface ElectronicHealthRecordCreationAttributes
  extends Optional<ElectronicHealthRecordAttributes, "id"> {}

class ElectronicHealthRecord
  extends Model<
    ElectronicHealthRecordAttributes,
    ElectronicHealthRecordCreationAttributes
  >
  implements ElectronicHealthRecordAttributes
{
  public id!: string;
  public patientId!: string;
  public therapistId!: string;
  public recordType!: string;
  public recordData!: object;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ElectronicHealthRecord.init(
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
    recordType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recordData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "electronic_health_records",
    timestamps: true,
  }
);

export default ElectronicHealthRecord;
