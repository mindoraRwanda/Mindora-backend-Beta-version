import { Model, DataTypes, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../../db";
import Therapist from "./therapist";

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
  resetPasswordToken?: string | null;
  resetPasswordExpiry?: Date | null;
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
  public resetPasswordToken?: string | null;
  public resetPasswordExpiry?: Date | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance method to compare passwords
  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
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
      type: DataTypes.ENUM("patient", "therapist", "admin"),
      defaultValue: "patient",
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
