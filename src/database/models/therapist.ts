import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface TherapistAttributes {
  id: string;
  personalInformation: object; // JSONB field
  diploma: string;
  license: string;
  userId: string;
}

interface TherapistCreationAttributes
  extends Optional<TherapistAttributes, "id"> {}

class Therapist
  extends Model<TherapistAttributes, TherapistCreationAttributes>
  implements TherapistAttributes
{
  public id!: string;
  public personalInformation!: object;
  public diploma!: string;
  public license!: string;
  public userId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Therapist.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    personalInformation: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    diploma: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    tableName: "therapists",
    timestamps: true,
  }
);

export default Therapist;
