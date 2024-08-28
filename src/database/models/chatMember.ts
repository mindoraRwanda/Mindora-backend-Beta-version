import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ChatMembersAttributes {
  id: string;
  chatId: string;
  userId: string;
  role?: string;
}

interface ChatMembersCreationAttributes
  extends Optional<ChatMembersAttributes, "role" | "id"> {}

class ChatMembers
  extends Model<ChatMembersAttributes, ChatMembersCreationAttributes>
  implements ChatMembersAttributes
{
  public id!: string;
  public chatId!: string;
  public userId!: string;
  public role?: string;
}

ChatMembers.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "chat_members",
    timestamps: false,
  }
);

export default ChatMembers;
