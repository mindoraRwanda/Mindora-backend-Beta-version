import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ChatMembersAttributes {
  chatId: string;
  userId: string;
  role?: string;
}

interface ChatMembersCreationAttributes
  extends Optional<ChatMembersAttributes, "role"> {}

class ChatMembers
  extends Model<ChatMembersAttributes, ChatMembersCreationAttributes>
  implements ChatMembersAttributes
{
  public chatId!: string;
  public userId!: string;
  public role?: string;
}

ChatMembers.init(
  {
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
