import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../../db";
import Patient from "./patient";

// Define the attributes for the User model
export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  password: string;
  role?: string;
}

// Define a type for the creation attributes, making all optional except password, email, username, firstName, and lastName
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "phoneNumber" | "profileImage" | "role" | "username"
  > {}

// Define the User model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public username?: string;
  public email!: string;
  public phoneNumber?: string;
  public profileImage?: string;
  public password!: string;
  public role!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING, // URL or file path to the profile image
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
