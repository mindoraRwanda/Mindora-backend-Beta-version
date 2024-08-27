import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface ChatAttributes {
  id: string;
  chatName: string;
  lastMessageId?: string;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {}

class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  public id!: string;
  public chatName!: string;
  public lastMessageId?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    chatName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastMessageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "chats",
    timestamps: true,
  }
);

export default Chat;
