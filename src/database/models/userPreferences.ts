import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface Communication {
  allowPhoneCalls: boolean;
  allowVideoCalls: boolean;
  allowChatting: boolean;
}

interface NotificationSettings {
  notifyBySMS: boolean;
  notifyByEmail: boolean;
  notifyByPush: boolean;
}

interface UserPreferencesAttributes {
  id: string;
  userId: string;
  preferredLanguage: string;
  communicationMethods: Communication;
  notificationSettings: NotificationSettings;
}

interface UserPreferencesCreationAttributes
  extends Optional<
    UserPreferencesAttributes,
    "id" | "communicationMethods" | "notificationSettings" | "preferredLanguage"
  > {}

class UserPreferences
  extends Model<UserPreferencesAttributes, UserPreferencesCreationAttributes>
  implements UserPreferencesAttributes
{
  public id!: string;
  public userId!: string;
  public preferredLanguage!: string;
  public communicationMethods!: Communication;
  public notificationSettings!: NotificationSettings;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserPreferences.init(
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
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en", // default to English
    },
    communicationMethods: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        allowPhoneCalls: false,
        allowVideoCalls: false,
        allowChatting: true, // default allows chatting
      },
    },
    notificationSettings: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        notifyBySMS: false,
        notifyByEmail: true,
        notifyByPush: true, // default email and push notifications
      },
    },
  },
  {
    sequelize,
    tableName: "user_preferences",
    timestamps: true,
  }
);

export default UserPreferences;
