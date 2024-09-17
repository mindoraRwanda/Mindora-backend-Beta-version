import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

// Define attributes for the LanguageSupport model
interface LanguageSupportAttributes {
  id: string;
  code: string;
  name: string;
  isDefault: boolean;
}

// Define optional attributes when creating a new LanguageSupport instance
interface LanguageSupportCreationAttributes
  extends Optional<LanguageSupportAttributes, "id"> {}

// Create the LanguageSupport model class
class LanguageSupport
  extends Model<LanguageSupportAttributes, LanguageSupportCreationAttributes>
  implements LanguageSupportAttributes
{
  public id!: string;
  public code!: string;
  public name!: string;
  public isDefault!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the LanguageSupport model
LanguageSupport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the language code is unique
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "language_support",
    timestamps: true,
  }
);

export default LanguageSupport;
