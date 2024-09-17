import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define the attributes for the Translation model
interface TranslationAttributes {
  id: string;
  languageId: string;
  key: string;
  value: string;
}

// Define optional attributes when creating a new Translation instance
interface TranslationCreationAttributes
  extends Optional<TranslationAttributes, "id"> {}

// Create the Translation model class
class Translation
  extends Model<TranslationAttributes, TranslationCreationAttributes>
  implements TranslationAttributes
{
  public id!: string;
  public languageId!: string;
  public key!: string;
  public value!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Translation model
Translation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    languageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "language_support",
        key: "id",
      },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "translations",
    timestamps: true,
  }
);

export default Translation;
