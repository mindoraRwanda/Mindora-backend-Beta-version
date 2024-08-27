import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface MedicationAttributes {
  id: string;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
}

interface MedicationCreationAttributes
  extends Optional<MedicationAttributes, "id"> {}

class Medication
  extends Model<MedicationAttributes, MedicationCreationAttributes>
  implements MedicationAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public dosageForm!: string;
  public strength!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Medication.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dosageForm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strength: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medications",
    timestamps: true,
  }
);

export default Medication;
